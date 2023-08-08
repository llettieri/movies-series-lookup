import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import {
    parseCreditsDto,
    parseMovieDto,
} from '@/app/api/services/ParseService';
import { Credits } from '@/models/Credits';
import { CreditsDto } from '@/models/dto/CreditsDto';
import { ListDto } from '@/models/dto/ListDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { Media } from '@/models/Media';
import { parseTemplate } from 'url-template';

async function getMovieDetails(movieId: number): Promise<Media> {
    const url = parseTemplate(routes.movies.byId.details).expand({
        id: movieId,
    });
    return await api()
        .get<MovieDto>(url)
        .then((r) => parseMovieDto(r.data));
}

async function getSimilarMovies(
    movieId: number,
    page?: number,
): Promise<Media[]> {
    const url = parseTemplate(routes.movies.byId.similar).expand({
        id: movieId,
        page: page ?? 1,
    });
    return await api()
        .get<ListDto<MovieDto>>(url)
        .then((r) => r.data.results.map(parseMovieDto));
}

async function getMovieCredits(movieId: number): Promise<Credits> {
    const url = parseTemplate(routes.movies.byId.credits).expand({
        id: movieId,
    });
    return await api()
        .get<CreditsDto>(url)
        .then((r) => parseCreditsDto(r.data));
}

export { getMovieDetails, getSimilarMovies, getMovieCredits };
