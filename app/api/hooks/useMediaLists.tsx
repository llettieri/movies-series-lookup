import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { parseMovieDto } from '@/app/api/services/MovieService';
import { parseTVShowDto } from '@/app/api/services/TVShowService';
import { ListDto } from '@/models/dto/ListDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { Media } from '@/models/Media';
import { TVShow } from '@/models/TVShow';
import useSWR from 'swr';

interface UseMovieValues {
    latestIsLoading: boolean;
    latestMovies: Media[];
    popularMoviesIsLoading: boolean;
    popularMovies: Media[];
    popularShows: TVShow[];
    popularShowsIsLoading: boolean;
    airingTodayShows: TVShow[];
    airingTodayIsLoading: boolean;
}

export const useMediaLists = (): UseMovieValues => {
    const { data: latestMovies, isLoading: latestIsLoading } = useSWR(
        routes.movies.nowPlaying(),
        (url) =>
            api()
                .get<ListDto<MovieDto>>(url)
                .then((r) => r.data.results.map(parseMovieDto)),
        { refreshInterval: 86400 },
    );

    const { data: popularMovies, isLoading: popularMoviesIsLoading } = useSWR(
        routes.movies.popular(),
        (url) =>
            api()
                .get<ListDto<MovieDto>>(url)
                .then((r) => r.data.results.map(parseMovieDto)),
        { refreshInterval: 86400 },
    );

    const { data: popularShows, isLoading: popularShowsIsLoading } = useSWR(
        routes.tv.popular(),
        (url) =>
            api()
                .get<ListDto<TVShowDto>>(url)
                .then((r) => r.data.results.map(parseTVShowDto)),
        { refreshInterval: 86400 },
    );

    const { data: airingTodayShows, isLoading: airingTodayIsLoading } = useSWR(
        routes.tv.airingToday(),
        (url) =>
            api()
                .get<ListDto<TVShowDto>>(url)
                .then((r) => r.data.results.map(parseTVShowDto)),
        { refreshInterval: 86400 },
    );

    return {
        latestIsLoading,
        latestMovies: latestMovies ?? [],
        popularMoviesIsLoading,
        popularMovies: popularMovies ?? [],
        popularShows: popularShows ?? [],
        popularShowsIsLoading,
        airingTodayShows: airingTodayShows ?? [],
        airingTodayIsLoading,
    };
};
