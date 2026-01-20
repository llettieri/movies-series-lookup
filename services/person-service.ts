import { apiRoutes } from '@/config/api-routes';
import { MediaCreditsDto } from '@/models/dto/media-credits-dto';
import { MovieDto } from '@/models/dto/movie-dto';
import { PersonDto } from '@/models/dto/person-dto';
import { TVShowDto } from '@/models/dto/tv-show-dto';
import { Media } from '@/models/media';
import { Person } from '@/models/person';
import { TVShow } from '@/models/tv-show';
import { TMDBApi } from '@/services/api';
import {
    parseMovieDto,
    parsePersonDto,
    parseTVShowDto,
} from '@/services/parse-service';

const getPersonDetails = async (personId: string): Promise<Person> => {
    const url = apiRoutes.person.byId.details.expand({
        id: personId,
    });
    return await TMDBApi.get<PersonDto>(url).then((r) =>
        parsePersonDto(r.data),
    );
};

const getPersonMovies = async (personId: string): Promise<Media[]> => {
    const url = apiRoutes.person.byId.movieCredits.expand({
        id: personId,
    });
    return await TMDBApi.get<MediaCreditsDto<MovieDto>>(url).then((r) => {
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

const getPersonTVShows = async (personId: string): Promise<TVShow[]> => {
    const url = apiRoutes.person.byId.tvCredits.expand({
        id: personId,
    });
    return await TMDBApi.get<MediaCreditsDto<TVShowDto>>(url).then((r) => {
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
