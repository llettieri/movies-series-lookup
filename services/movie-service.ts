import { routes } from '@/config/routes';
import { Credits } from '@/models/credits';
import { CreditsDto } from '@/models/dto/credits-dto';
import { ListDto } from '@/models/dto/list-dto';
import { MovieDto } from '@/models/dto/movie-dto';
import { Media } from '@/models/media';
import { TMDBApi } from '@/services/api';
import { parseCreditsDto, parseMovieDto } from '@/services/parse-service';
import { parseTemplate } from 'url-template';

const getLatestMovies = async (locale: string): Promise<Media[]> => {
    const url = parseTemplate(routes.movies.nowPlaying).expand({
        page: 1,
        region: locale,
    });
    return await TMDBApi.get<ListDto<MovieDto>>(url).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getPopularMovies = async (locale: string): Promise<Media[]> => {
    const url = parseTemplate(routes.movies.popular).expand({
        page: 1,
        region: locale,
    });
    return await TMDBApi.get<ListDto<MovieDto>>(url).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getMovieDetails = async (movieId: number): Promise<Media> => {
    const url = parseTemplate(routes.movies.byId.details).expand({
        id: movieId,
    });

    return await TMDBApi.get<MovieDto>(url).then((r) => parseMovieDto(r.data));
};

const getSimilarMovies = async (
    movieId: number,
    page?: number,
): Promise<Media[]> => {
    const url = parseTemplate(routes.movies.byId.similar).expand({
        id: movieId,
        page: page ?? 1,
    });
    return await TMDBApi.get<ListDto<MovieDto>>(url).then((r) =>
        r.data.results.map(parseMovieDto),
    );
};

const getMovieCredits = async (movieId: number): Promise<Credits> => {
    const url = parseTemplate(routes.movies.byId.credits).expand({
        id: movieId,
    });
    return await TMDBApi.get<CreditsDto>(url).then((r) =>
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
