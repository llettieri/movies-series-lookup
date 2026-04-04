import { apiRoutes } from '@/config/api-routes';
import { Credits } from '@/models/credits';
import { CountryProvidersDto } from '@/models/dto/country-providers-dto';
import { CreditsDto } from '@/models/dto/credits-dto';
import { ListDto } from '@/models/dto/list-dto';
import { TVShowDto, TVShowSeasonDto } from '@/models/dto/tv-show-dto';
import { WatchProvidersDto } from '@/models/dto/watch-providers-dto';
import { Provider } from '@/models/provider';
import { ProviderGroup } from '@/models/provider-group';
import { TVShow, TVShowSeason } from '@/models/tv-show';
import { TMDBApi } from '@/services/api';
import {
    parseCreditsDto,
    parseProviderDto,
    parseTVShowDto,
    parseTVShowSeasonDto,
} from '@/services/parse-service';
import dayjs from 'dayjs';

/* eslint-disable camelcase */
const getPopularShows = async (locale: string): Promise<TVShow[]> => {
    const url = apiRoutes.tv.discover.expand({
        watch_region: locale,
        with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
    });

    return await TMDBApi.get<ListDto<TVShowDto>>(url).then((r) =>
        r.data.results.map(parseTVShowDto),
    );
};

const getAiringTodayShows = async (locale: string): Promise<TVShow[]> => {
    const today = dayjs().format('YYYY-MM-DD');

    const url = apiRoutes.tv.discover.expand({
        watch_region: locale,
        with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
        'air_date.gte': today,
        'air_date.lte': today,
    });
    return await TMDBApi.get<ListDto<TVShowDto>>(url).then((r) =>
        r.data.results.map(parseTVShowDto),
    );
};

const getTVShowDetails = async (showId: string): Promise<TVShow> => {
    const url = apiRoutes.tv.byId.details.expand({ id: showId });
    return await TMDBApi.get<TVShowDto>(url).then((r) =>
        parseTVShowDto(r.data),
    );
};

const getSimilarTVShows = async (showId: string): Promise<TVShow[]> => {
    const url = apiRoutes.tv.byId.similar.expand({ id: showId });
    return await TMDBApi.get<ListDto<TVShowDto>>(url).then((r) =>
        r.data.results.map(parseTVShowDto),
    );
};

const getTVShowCredits = async (showId: string): Promise<Credits> => {
    const url = apiRoutes.tv.byId.aggregateCredits.expand({
        id: showId,
    });
    return await TMDBApi.get<CreditsDto>(url).then((r) =>
        parseCreditsDto(r.data),
    );
};

const getTVShowSeasonCredits = async (
    showId: string,
    seasonNumber: number,
): Promise<Credits> => {
    const url = apiRoutes.tv.byId.season.aggregateCredits.expand({
        showId,
        seasonNumber,
    });
    return await TMDBApi.get<CreditsDto>(url).then((r) =>
        parseCreditsDto(r.data),
    );
};

const getTVShowWatchProviders = async (
    showId: string,
    locale: string,
): Promise<ProviderGroup | undefined> => {
    const url = apiRoutes.tv.byId.watchProviders.expand({
        id: showId,
    });

    return await TMDBApi.get<WatchProvidersDto>(url)
        .then((r) => {
            const rawCountryProviders: Map<string, CountryProvidersDto> =
                new Map(Object.entries(r.data.results));
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

            return countryProviders.get(locale);
        })
        .catch(() => undefined);
};

const getTVShowSeasonWatchProviders = async (
    showId: string,
    seasonNumber: number,
    locale: string,
): Promise<ProviderGroup | undefined> => {
    const url = apiRoutes.tv.byId.season.watchProviders.expand({
        showId,
        seasonNumber,
    });

    return await TMDBApi.get<WatchProvidersDto>(url)
        .then((r) => {
            const rawCountryProviders: Map<string, CountryProvidersDto> =
                new Map(Object.entries(r.data.results));
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

            return countryProviders.get(locale);
        })
        .catch(() => undefined);
};

const getTVShowSeasonDetails = async (
    showId: string,
    seasonNumber: number,
): Promise<TVShowSeason> => {
    const url = apiRoutes.tv.byId.season.details.expand({
        showId,
        seasonNumber,
    });
    return await TMDBApi.get<TVShowSeasonDto>(url).then((r) =>
        parseTVShowSeasonDto(r.data, showId),
    );
};

export {
    getPopularShows,
    getAiringTodayShows,
    getTVShowDetails,
    getTVShowSeasonDetails,
    getSimilarTVShows,
    getTVShowCredits,
    getTVShowSeasonCredits,
    getTVShowWatchProviders,
    getTVShowSeasonWatchProviders,
};
