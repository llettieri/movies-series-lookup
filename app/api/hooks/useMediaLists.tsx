import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { localGetItem } from '@/app/api/config/Storage';
import { StorageKeys } from '@/app/api/config/StorageKeys';
import { parseMovieDto, parseTVShowDto } from '@/app/api/services/ParseService';
import { ListDto } from '@/models/dto/ListDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { Media } from '@/models/Media';
import { TVShow } from '@/models/TVShow';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { parseTemplate } from 'url-template';

interface UseMovieValues {
    airingTodayShows: TVShow[];
    latestMovies: Media[];
    loadingAiringToday: boolean;
    loadingLatestMovies: boolean;
    loadingPopularMovies: boolean;
    loadingPopularShows: boolean;
    popularMovies: Media[];
    popularShows: TVShow[];
}
/* eslint-disable camelcase */
export const useMediaLists = (): UseMovieValues => {
    const today = dayjs().format('YYYY-MM-DD');
    const { data: latestMovies, isLoading: loadingLatestMovies } = useSWR(
        parseTemplate(routes.movies.nowPlaying).expand({ page: 1 }),
        (url) =>
            api()
                .get<ListDto<MovieDto>>(url)
                .then((r) => r.data.results.map(parseMovieDto)),
        { refreshInterval: 86400 },
    );

    const { data: popularMovies, isLoading: loadingPopularMovies } = useSWR(
        parseTemplate(routes.movies.popular).expand({ page: 1 }),
        (url) =>
            api()
                .get<ListDto<MovieDto>>(url)
                .then((r) => r.data.results.map(parseMovieDto)),
        { refreshInterval: 86400 },
    );

    const { data: popularShows, isLoading: loadingPopularShows } = useSWR(
        parseTemplate(routes.tv.discover).expand({
            watch_region: localGetItem(StorageKeys.REGION),
            with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
        }),
        (url) =>
            api()
                .get<ListDto<TVShowDto>>(url)
                .then((r) => r.data.results.map(parseTVShowDto)),
        { refreshInterval: 86400 },
    );

    const { data: airingTodayShows, isLoading: loadingAiringToday } = useSWR(
        parseTemplate(routes.tv.discover).expand({
            watch_region: localGetItem(StorageKeys.REGION),
            with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
            'air_date.gte': today,
            'air_date.lte': today,
        }),
        (url) =>
            api()
                .get<ListDto<TVShowDto>>(url)
                .then((r) => r.data.results.map(parseTVShowDto)),
        { refreshInterval: 86400 },
    );

    return {
        airingTodayShows: airingTodayShows ?? [],
        latestMovies: latestMovies ?? [],
        loadingAiringToday,
        loadingLatestMovies,
        loadingPopularMovies,
        loadingPopularShows: loadingPopularShows,
        popularMovies: popularMovies ?? [],
        popularShows: popularShows ?? [],
    };
};
