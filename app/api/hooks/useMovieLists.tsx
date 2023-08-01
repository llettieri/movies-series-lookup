import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { Movie } from '@/models/Movie';
import useSWR from 'swr';

interface UseMovieValues {
    latestIsLoading: boolean;
    latestMovies: Movie[];
    popularIsLoading: boolean;
    popularMovies: Movie[];
}

export const useMovieLists = (): UseMovieValues => {
    const { data: latestMovies, isLoading: latestIsLoading } = useSWR(
        routes.movies.nowPlaying(),
        (url) =>
            api()
                .get<ListDto<Movie>>(url)
                .then((r) => r.data.results),
        { refreshInterval: 86400 },
    );

    const { data: popularMovies, isLoading: popularIsLoading } = useSWR(
        routes.movies.popular(),
        (url) =>
            api()
                .get<ListDto<Movie>>(url)
                .then((r) => r.data.results),
        { refreshInterval: 86400 },
    );

    return {
        latestIsLoading,
        latestMovies: latestMovies ?? [],
        popularIsLoading,
        popularMovies: popularMovies ?? [],
    };
};
