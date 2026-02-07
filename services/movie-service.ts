import { apiRoutes } from '@/config/api-routes';
import { Credits } from '@/models/credits';
import { CreditsDto } from '@/models/dto/credits-dto';
import { ListDto } from '@/models/dto/list-dto';
import { MovieDto } from '@/models/dto/movie-dto';
import { Media } from '@/models/media';
import { TMDBApi } from '@/services/api';
import {
    parseCreditsDto,
    parseMovieDto,
    parseProviderDto,
} from '@/services/parse-service';
import { ProviderGroup } from '@/models/provider-group';
import { WatchProvidersDto } from '@/models/dto/watch-providers-dto';
import { CountryProvidersDto } from '@/models/dto/country-providers-dto';
import { Provider } from '@/models/provider';

const getLatestMovies = async (locale: string): Promise<Media[]> => {
    const url = apiRoutes.movies.nowPlaying.expand({
        page: 1,
        region: locale,
    });
    return await TMDBApi.get<ListDto<MovieDto>>(url).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getPopularMovies = async (locale: string): Promise<Media[]> => {
    const url = apiRoutes.movies.popular.expand({
        page: 1,
        region: locale,
    });
    return await TMDBApi.get<ListDto<MovieDto>>(url).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getMovieDetails = async (movieId: string): Promise<Media> => {
    const url = apiRoutes.movies.byId.details.expand({
        id: movieId,
    });

    return await TMDBApi.get<MovieDto>(url).then((r) => parseMovieDto(r.data));
};

const getSimilarMovies = async (
    movieId: string,
    page?: number,
): Promise<Media[]> => {
    const url = apiRoutes.movies.byId.similar.expand({
        id: movieId,
        page: page ?? 1,
    });
    return await TMDBApi.get<ListDto<MovieDto>>(url).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getMovieCredits = async (movieId: string): Promise<Credits> => {
    const url = apiRoutes.movies.byId.credits.expand({
        id: movieId,
    });
    return await TMDBApi.get<CreditsDto>(url).then((r) =>
        parseCreditsDto(r.data),
    );
};

const getMovieWatchProviders = async (
    movieId: string,
    locale: string,
): Promise<ProviderGroup | undefined> => {
    const url = apiRoutes.movies.byId.watchProviders.expand({
        id: movieId,
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

export {
    getLatestMovies,
    getPopularMovies,
    getMovieDetails,
    getSimilarMovies,
    getMovieCredits,
    getMovieWatchProviders,
};
