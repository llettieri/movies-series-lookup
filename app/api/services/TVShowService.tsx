import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import {
    parseCreditsDto,
    parseProviderDto,
    parseTVShowDto,
} from '@/app/api/services/ParseService';
import { CountryProviders } from '@/models/CountryProviders';
import { Credits } from '@/models/Credits';
import { CountryProvidersDto } from '@/models/dto/CountryProvidersDto';
import { CreditsDto } from '@/models/dto/CreditsDto';
import { ListDto } from '@/models/dto/ListDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { TVShow } from '@/models/TVShow';
import { parseTemplate } from 'url-template';

const getTVShowDetails = async (showId: number): Promise<TVShow> => {
    const url = parseTemplate(routes.tv.byId.details).expand({ id: showId });
    return await api()
        .get<TVShowDto>(url)
        .then((r) => parseTVShowDto(r.data));
};

const getSimilarTVShows = async (showId: number): Promise<TVShow[]> => {
    const url = parseTemplate(routes.tv.byId.similar).expand({ id: showId });
    return await api()
        .get<ListDto<TVShowDto>>(url)
        .then((r) => r.data.results.map(parseTVShowDto));
};

const getTVShowsCredits = async (showId: number): Promise<Credits> => {
    const url = parseTemplate(routes.tv.byId.aggregateCredits).expand({
        id: showId,
    });
    return await api()
        .get<CreditsDto>(url)
        .then((r) => parseCreditsDto(r.data));
};

const getTVShowWatchProviders = async (
    showId: number,
): Promise<Map<string, CountryProviders>> => {
    const url = parseTemplate(routes.tv.byId.watchProviders).expand({
        id: showId,
    });

    return await api()
        .get(url)
        .then((r) => {
            const countryProviders: Map<string, CountryProvidersDto> = new Map(
                Object.entries(r.data.results),
            );
            const parsedCountryProviders: Map<string, CountryProviders> =
                new Map();
            countryProviders.forEach((value, key) => {
                parsedCountryProviders.set(key, {
                    link: value.link,
                    buy: value.buy?.map(parseProviderDto),
                    flatrate: value.flatrate?.map(parseProviderDto),
                    free: value.free?.map(parseProviderDto),
                });
            });

            return parsedCountryProviders;
        });
};

export {
    getTVShowDetails,
    getSimilarTVShows,
    getTVShowsCredits,
    getTVShowWatchProviders,
};
