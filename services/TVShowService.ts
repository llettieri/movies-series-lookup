import { routes } from '@/config/routes';
import { Credits } from '@/models/Credits';
import { CountryProvidersDto } from '@/models/dto/CountryProvidersDto';
import { CreditsDto } from '@/models/dto/CreditsDto';
import { ListDto } from '@/models/dto/ListDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { WatchProvidersDto } from '@/models/dto/WatchProvidersDto';
import { Provider } from '@/models/Provider';
import { ProviderGroup } from '@/models/ProviderGroup';
import { TVShow } from '@/models/TVShow';
import { get } from '@/services/AxiosService';
import {
    parseCreditsDto,
    parseProviderDto,
    parseTVShowDto,
} from '@/services/ParseService';
import { getSession } from '@/services/SessionService';
import dayjs from 'dayjs';
import { parseTemplate } from 'url-template';

const getPopularShows = async (): Promise<TVShow[]> => {
    const session = await getSession();

    const url = parseTemplate(routes.tv.discover).expand({
        watch_region: session?.locale ?? 'en-us',
        with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
    });

    return await get<ListDto<TVShowDto>>(url, true).then((r) =>
        r.data.results.map(parseTVShowDto),
    );
};

const getAiringTodayShows = async (): Promise<TVShow[]> => {
    const session = await getSession();
    const today = dayjs().format('YYYY-MM-DD');

    const url = parseTemplate(routes.tv.discover).expand({
        watch_region: session?.locale ?? 'en-us',
        with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
        'air_date.gte': today,
        'air_date.lte': today,
    });
    return await get<ListDto<TVShowDto>>(url, true).then((r) =>
        r.data.results.map(parseTVShowDto),
    );
};

const getTVShowDetails = async (showId: number): Promise<TVShow> => {
    const url = parseTemplate(routes.tv.byId.details).expand({ id: showId });
    return await get<TVShowDto>(url, true).then((r) => parseTVShowDto(r.data));
};

const getSimilarTVShows = async (showId: number): Promise<TVShow[]> => {
    const url = parseTemplate(routes.tv.byId.similar).expand({ id: showId });
    return await get<ListDto<TVShowDto>>(url, true).then((r) =>
        r.data.results.map(parseTVShowDto),
    );
};

const getTVShowsCredits = async (showId: number): Promise<Credits> => {
    const url = parseTemplate(routes.tv.byId.aggregateCredits).expand({
        id: showId,
    });
    return await get<CreditsDto>(url, true).then((r) =>
        parseCreditsDto(r.data),
    );
};

const getTVShowWatchProviders = async (
    showId: number,
): Promise<ProviderGroup | undefined> => {
    const session = await getSession();
    const url = parseTemplate(routes.tv.byId.watchProviders).expand({
        id: showId,
    });

    return await get<WatchProvidersDto>(url, true).then((r) => {
        const rawCountryProviders: Map<string, CountryProvidersDto> = new Map(
            Object.entries(r.data.results),
        );
        const countryProviders: Map<string, ProviderGroup> = new Map();
        rawCountryProviders.forEach((value, key) => {
            const providers: Provider[] = [
                ...(value.buy?.map(parseProviderDto) ?? []),
                ...(value.flatrate?.map(parseProviderDto) ?? []),
                ...(value.free?.map(parseProviderDto) ?? []),
            ];
            providers.sort((a, b) => a.displayPriority - b.displayPriority);
            countryProviders.set(key, {
                link: value.link,
                providers,
            });
        });

        return countryProviders.get(session?.locale ?? '');
    });
};

export {
    getPopularShows,
    getAiringTodayShows,
    getTVShowDetails,
    getSimilarTVShows,
    getTVShowsCredits,
    getTVShowWatchProviders,
};
