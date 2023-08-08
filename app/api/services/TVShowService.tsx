import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import {
    parseCreditsDto,
    parseTVShowDto,
} from '@/app/api/services/ParseService';
import { Credits } from '@/models/Credits';
import { CreditsDto } from '@/models/dto/CreditsDto';
import { ListDto } from '@/models/dto/ListDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { TVShow } from '@/models/TVShow';
import { parseTemplate } from 'url-template';

const getTVShowDetails = async (showId: number): Promise<TVShow> => {
    const url = parseTemplate(routes.tv.byId.details).expand({ id: showId });
    return await api()
        .get<TVShowDto>(url)
        .then((r) => parseTVShowDto(r.data));
};

const getSimilarTVShows = async (showId: number): Promise<TVShow[]> => {
    const url = parseTemplate(routes.tv.byId.similar).expand({ id: showId });
    return await api()
        .get<ListDto<TVShowDto>>(url)
        .then((r) => r.data.results.map(parseTVShowDto));
};

const getTVShowsCredits = async (showId: number): Promise<Credits> => {
    const url = parseTemplate(routes.tv.byId.aggregateCredits).expand({
        id: showId,
    });
    return await api()
        .get<CreditsDto>(url)
        .then((r) => parseCreditsDto(r.data));
};

export { getTVShowDetails, getSimilarTVShows, getTVShowsCredits };
