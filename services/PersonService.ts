import { routes } from '@/config/routes';
import { MediaCreditsDto } from '@/models/dto/MediaCreditsDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { PersonDto } from '@/models/dto/PersonDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { Media } from '@/models/Media';
import { Person } from '@/models/Person';
import { TVShow } from '@/models/TVShow';
import { get } from '@/services/AxiosService';
import {
    parseMovieDto,
    parsePersonDto,
    parseTVShowDto,
} from '@/services/ParseService';
import { parseTemplate } from 'url-template';

const getPersonDetails = async (personId: number): Promise<Person> => {
    const url = parseTemplate(routes.person.byId.details).expand({
        id: personId,
    });
    return await get<PersonDto>(url, true).then((r) => parsePersonDto(r.data));
};

const getPersonMovies = async (personId: number): Promise<Media[]> => {
    const url = parseTemplate(routes.person.byId.movieCredits).expand({
        id: personId,
    });
    return await get<MediaCreditsDto<MovieDto>>(url, true).then((r) => {
        const results = [...r.data.crew, ...r.data.cast];
        const movies: Media[] = [];
        results.map(parseMovieDto).forEach((result) => {
            if (!movies.map((movie) => movie.id).includes(result.id)) {
                movies.push(result);
            }
        });
        return movies;
    });
};

const getPersonTVShows = async (personId: number): Promise<TVShow[]> => {
    const url = parseTemplate(routes.person.byId.tvCredits).expand({
        id: personId,
    });
    return await get<MediaCreditsDto<TVShowDto>>(url, true).then((r) => {
        const results = [...r.data.crew, ...r.data.cast];
        const shows: TVShow[] = [];
        results.map(parseTVShowDto).forEach((result) => {
            if (!shows.map((show) => show.id).includes(result.id)) {
                shows.push(result);
            }
        });
        return shows;
    });
};

export { getPersonDetails, getPersonMovies, getPersonTVShows };
