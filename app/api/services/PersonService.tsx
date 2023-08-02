import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { parseMovieDto } from '@/app/api/services/MovieService';
import { parseTVShowDto } from '@/app/api/services/TVShowService';
import { MediaCreditsDto } from '@/models/dto/MediaCreditsDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { Media } from '@/models/Media';
import { Person } from '@/models/Person';
import { TVShow } from '@/models/TVShow';

async function getPersonDetails(personId: number): Promise<Person> {
    return await api()
        .get<Person>(routes.person.byId(personId).details)
        .then((r) => r.data);
}

async function getPersonMovies(personId: number): Promise<Media[]> {
    return await api()
        .get<MediaCreditsDto<MovieDto>>(
            routes.person.byId(personId).movieCredits,
        )
        .then((r) => {
            const results = [...r.data.crew, ...r.data.cast];
            const movies: Media[] = [];
            results.map(parseMovieDto).forEach((result) => {
                if (!movies.map((movie) => movie.id).includes(result.id)) {
                    movies.push(result);
                }
            });
            return movies;
        });
}

async function getPersonTVShows(personId: number): Promise<TVShow[]> {
    return await api()
        .get<MediaCreditsDto<TVShowDto>>(routes.person.byId(personId).tvCredits)
        .then((r) => {
            const results = [...r.data.crew, ...r.data.cast];
            const shows: TVShow[] = [];
            results.map(parseTVShowDto).forEach((result) => {
                if (!shows.map((show) => show.id).includes(result.id)) {
                    shows.push(result);
                }
            });
            return shows;
        });
}

export { getPersonDetails, getPersonMovies, getPersonTVShows };
