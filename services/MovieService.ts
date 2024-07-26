import { routes } from '@/config/routes';
import { Credits } from '@/models/Credits';
import { CreditsDto } from '@/models/dto/CreditsDto';
import { ListDto } from '@/models/dto/ListDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { Media } from '@/models/Media';
import { get } from '@/services/AxiosService';
import { parseCreditsDto, parseMovieDto } from '@/services/ParseService';
import { parseTemplate } from 'url-template';

const getLatestMovies = async (): Promise<Media[]> => {
    const url = parseTemplate(routes.movies.nowPlaying).expand({ page: 1 });
    return await get<ListDto<MovieDto>>(url, true).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getPopularMovies = async (): Promise<Media[]> => {
    const url = parseTemplate(routes.movies.popular).expand({ page: 1 });
    return await get<ListDto<MovieDto>>(url, true).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getMovieDetails = async (movieId: number): Promise<Media> => {
    const url = parseTemplate(routes.movies.byId.details).expand({
        id: movieId,
    });

    return await get<MovieDto>(url, true).then((r) => parseMovieDto(r.data));
};

const getSimilarMovies = async (
    movieId: number,
    page?: number,
): Promise<Media[]> => {
    const url = parseTemplate(routes.movies.byId.similar).expand({
        id: movieId,
        page: page ?? 1,
    });
    return await get<ListDto<MovieDto>>(url, true).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getMovieCredits = async (movieId: number): Promise<Credits> => {
    const url = parseTemplate(routes.movies.byId.credits).expand({
        id: movieId,
    });
    return await get<CreditsDto>(url, true).then((r) =>
        parseCreditsDto(r.data),
    );
};

export {
    getLatestMovies,
    getPopularMovies,
    getMovieDetails,
    getSimilarMovies,
    getMovieCredits,
};
