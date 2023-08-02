import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { PeopleCreditsDto } from '@/models/dto/PeopleCreditsDto';
import { Media } from '@/models/Media';
import { MediaType } from '@/models/MediaType';

async function getMovieDetails(movieId: number): Promise<Media> {
    return await api()
        .get<MovieDto>(routes.movies.byId(movieId).details)
        .then((r) => parseMovieDto(r.data));
}

async function getSimilarMovies(
    movieId: number,
    page?: number,
): Promise<Media[]> {
    return await api()
        .get<ListDto<MovieDto>>(routes.movies.byId(movieId).similar(page))
        .then((r) => r.data.results.map(parseMovieDto));
}

async function getMovieCredits(movieId: number): Promise<PeopleCreditsDto> {
    return await api()
        .get<PeopleCreditsDto>(routes.movies.byId(movieId).credits)
        .then((r) => r.data);
}

function parseMovieDto(m: MovieDto): Media {
    return {
        backdrop: m.backdrop_path
            ? `${routes.images}${m.backdrop_path}`
            : undefined,
        collection: m.belongs_to_collection,
        genres: m.genres,
        homepage: m.homepage,
        id: m.id,
        mediaType: MediaType.MOVIE,
        overview: m.overview,
        poster: m.poster_path ? `${routes.images}${m.poster_path}` : undefined,
        releaseDate: m.release_date,
        runtime: m.runtime,
        title: m.title,
    };
}

export { getMovieDetails, getSimilarMovies, getMovieCredits, parseMovieDto };
