import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { parseMovieDto, parseTVShowDto } from '@/app/api/services/ParseService';
import { ListDto } from '@/models/dto/ListDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { Media } from '@/models/Media';
import { TVShow } from '@/models/TVShow';
import useSWR from 'swr';
import { parseTemplate } from 'url-template';

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
        parseTemplate(routes.movies.nowPlaying).expand({ page: 1 }),
        (url) =>
            api()
                .get<ListDto<MovieDto>>(url)
                .then((r) => r.data.results.map(parseMovieDto)),
        { refreshInterval: 86400 },
    );

    const { data: popularMovies, isLoading: popularMoviesIsLoading } = useSWR(
        parseTemplate(routes.movies.popular).expand({ page: 1 }),
        (url) =>
            api()
                .get<ListDto<MovieDto>>(url)
                .then((r) => r.data.results.map(parseMovieDto)),
        { refreshInterval: 86400 },
    );

    const { data: popularShows, isLoading: popularShowsIsLoading } = useSWR(
        parseTemplate(routes.tv.popular).expand({ page: 1 }),
        (url) =>
            api()
                .get<ListDto<TVShowDto>>(url)
                .then((r) => r.data.results.map(parseTVShowDto)),
        { refreshInterval: 86400 },
    );

    const { data: airingTodayShows, isLoading: airingTodayIsLoading } = useSWR(
        parseTemplate(routes.tv.airingToday).expand({}),
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
