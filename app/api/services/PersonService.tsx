import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { parseMovieDto } from '@/app/api/services/MovieService';
import { parseTVShowDto } from '@/app/api/services/TVShowService';
import { MediaCreditsDto } from '@/models/dto/MediaCreditsDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { PersonDto } from '@/models/dto/PersonDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { Media } from '@/models/Media';
import { Person } from '@/models/Person';
import { TVShow } from '@/models/TVShow';
import { parseTemplate } from 'url-template';

async function getPersonDetails(personId: number): Promise<Person> {
    const url = parseTemplate(routes.person.byId.details).expand({
        id: personId,
    });
    return await api()
        .get<PersonDto>(url)
        .then((r) => parsePersonDto(r.data));
}

async function getPersonMovies(personId: number): Promise<Media[]> {
    const url = parseTemplate(routes.person.byId.movieCredits).expand({
        id: personId,
    });
    return await api()
        .get<MediaCreditsDto<MovieDto>>(url)
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
    const url = parseTemplate(routes.person.byId.tvCredits).expand({
        id: personId,
    });
    return await api()
        .get<MediaCreditsDto<TVShowDto>>(url)
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

function parsePersonDto(personDto: PersonDto): Person {
    return {
        id: personDto.id,
        name: personDto.name,
        birthday: personDto.birthday,
        portrait: personDto.profile_path
            ? `${routes.images}${personDto.profile_path}`
            : undefined,
        biography: personDto.biography,
        character: personDto.character,
        deathday: personDto.deathday,
        gender: personDto.gender,
        homepage: personDto.deathday,
        department: personDto.known_for_department,
    };
}

export { getPersonDetails, getPersonMovies, getPersonTVShows, parsePersonDto };
