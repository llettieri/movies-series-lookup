import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { MediaCreditsDto } from '@/models/dto/MediaCreditsDto';
import { Movie } from '@/models/Movie';
import { Person } from '@/models/Person';
import { TVShow } from '@/models/TVShow';

async function getPersonDetails(personId: number): Promise<Person> {
    return await api()
        .get<Person>(routes.person.byId(personId).details)
        .then((r) => r.data);
}

async function getPersonMovies(personId: number): Promise<Movie[]> {
    return await api()
        .get<MediaCreditsDto<Movie>>(routes.person.byId(personId).movieCredits)
        .then((r) => {
            const results = [...r.data.crew, ...r.data.cast];
            const movies: Movie[] = [];
            results.forEach((result) => {
                if (!movies.map((movie) => movie.id).includes(result.id)) {
                    movies.push(result);
                }
            });
            return movies;
        });
}
async function getPersonTVShows(personId: number): Promise<TVShow[]> {
    return await api()
        .get<MediaCreditsDto<TVShow>>(routes.person.byId(personId).tvCredits)
        .then((r) => {
            const results = [...r.data.crew, ...r.data.cast];
            const shows: TVShow[] = [];
            results.forEach((result) => {
                if (!shows.map((show) => show.id).includes(result.id)) {
                    shows.push(result);
                }
            });
            return shows;
        });
}

export { getPersonDetails, getPersonMovies, getPersonTVShows };
