import { routes } from '@/config/routes';
import { useAxios } from '@/hooks/useAxios';
import { ListDto } from '@/models/dto/ListDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { Media } from '@/models/Media';
import { TVShow } from '@/models/TVShow';
import { parseMovieDto, parseTVShowDto } from '@/services/ParseService';
import { localGetItem } from '@/storage/Storage';
import { StorageKeys } from '@/storage/StorageKeys';
import { DefaultError, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
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
    const axios = useAxios(process.env.NEXT_PUBLIC_API_KEY);
    const today = dayjs().format('YYYY-MM-DD');

    const { data: latestMovies, isLoading: loadingLatestMovies } = useQuery<
        Media[]
    >({
        queryKey: ['latestMovies'],
        queryFn: () =>
            axios
                .get<
                    ListDto<MovieDto>
                >(parseTemplate(routes.movies.nowPlaying).expand({ page: 1 }))
                .then((r) => r.data.results.map(parseMovieDto)),
        initialData: [],
        refetchInterval: 86400,
    });

    const { data: popularMovies, isLoading: loadingPopularMovies } = useQuery<
        Media[]
    >({
        queryKey: ['popularMovies'],
        queryFn: () =>
            axios
                .get<
                    ListDto<MovieDto>
                >(parseTemplate(routes.movies.popular).expand({ page: 1 }))
                .then((r) => r.data.results.map(parseMovieDto)),
        initialData: [],
        refetchInterval: 86400,
    });

    const { data: popularShows, isLoading: loadingPopularShows } = useQuery<
        TVShow[],
        DefaultError,
        TVShow[],
        string[]
    >({
        queryKey: [
            'popularShows',
            localGetItem(StorageKeys.REGION),
            'flatrate|free|ads|rent|buy',
        ],
        queryFn: ({ queryKey }) =>
            axios
                .get<ListDto<TVShowDto>>(
                    parseTemplate(routes.tv.discover).expand({
                        watch_region: queryKey[1],
                        with_watch_monetization_types: queryKey[2],
                    }),
                )
                .then((r) => r.data.results.map(parseTVShowDto)),
        initialData: [],
        refetchInterval: 86400,
    });

    const { data: airingTodayShows, isLoading: loadingAiringToday } = useQuery<
        TVShow[],
        DefaultError,
        TVShow[],
        string[]
    >({
        queryKey: [
            'airingTodayShows',
            localGetItem(StorageKeys.REGION),
            'flatrate|free|ads|rent|buy',
            today,
        ],
        queryFn: ({ queryKey }) =>
            axios
                .get<ListDto<TVShowDto>>(
                    parseTemplate(routes.tv.discover).expand({
                        watch_region: queryKey[1],
                        with_watch_monetization_types: queryKey[2],
                        'air_date.gte': queryKey[3],
                        'air_date.lte': queryKey[3],
                    }),
                )
                .then((r) => r.data.results.map(parseTVShowDto)),
        initialData: [],
        refetchInterval: 43200,
    });

    return {
        airingTodayShows,
        latestMovies,
        loadingAiringToday,
        loadingLatestMovies,
        loadingPopularMovies,
        loadingPopularShows,
        popularMovies,
        popularShows,
    };
};
