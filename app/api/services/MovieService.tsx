import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { PeopleCreditsDto } from '@/models/dto/PeopleCreditsDto';
import { Movie } from '@/models/Movie';

async function getMovieDetails(movieId: number): Promise<Movie> {
    return await api()
        .get<Movie>(routes.movies.byId(movieId).details)
        .then((r) => r.data);
}

async function getSimilarMovies(
    movieId: number,
    page?: number,
): Promise<Movie[]> {
    return await api()
        .get<ListDto<Movie>>(routes.movies.byId(movieId).similar(page))
        .then((r) => r.data.results);
}

async function getMovieCredits(movieId: number): Promise<PeopleCreditsDto> {
    return await api()
        .get<PeopleCreditsDto>(routes.movies.byId(movieId).credits)
        .then((r) => r.data);
}

export { getMovieDetails, getSimilarMovies, getMovieCredits };
