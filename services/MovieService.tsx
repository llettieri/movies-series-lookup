import { routes } from '@/config/routes';
import { Credits } from '@/models/Credits';
import { CreditsDto } from '@/models/dto/CreditsDto';
import { ListDto } from '@/models/dto/ListDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { Media } from '@/models/Media';
import { axiosInstance } from '@/services/AxiosService';
import { parseCreditsDto, parseMovieDto } from '@/services/ParseService';
import { parseTemplate } from 'url-template';

const axios = axiosInstance(process.env.NEXT_PUBLIC_API_KEY);

const getMovieDetails = async (movieId: number): Promise<Media> => {
    const url = parseTemplate(routes.movies.byId.details).expand({
        id: movieId,
    });

    return await axios.get<MovieDto>(url).then((r) => parseMovieDto(r.data));
};

const getSimilarMovies = async (
    movieId: number,
    page?: number,
): Promise<Media[]> => {
    const url = parseTemplate(routes.movies.byId.similar).expand({
        id: movieId,
        page: page ?? 1,
    });
    return await axios
        .get<ListDto<MovieDto>>(url)
        .then((r) => r.data.results.map(parseMovieDto));
};

const getMovieCredits = async (movieId: number): Promise<Credits> => {
    const url = parseTemplate(routes.movies.byId.credits).expand({
        id: movieId,
    });
    return await axios
        .get<CreditsDto>(url)
        .then((r) => parseCreditsDto(r.data));
};

export { getMovieDetails, getSimilarMovies, getMovieCredits };
