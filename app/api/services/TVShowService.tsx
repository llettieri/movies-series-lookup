import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { PeopleCreditsDto } from '@/models/dto/PeopleCreditsDto';
import { TVShow } from '@/models/TVShow';

async function getTVShowDetails(showId: number): Promise<TVShow> {
    return await api()
        .get<TVShow>(routes.tv.byId(showId).details)
        .then((r) => r.data);
}

async function getSimilarTVShows(showId: number): Promise<TVShow[]> {
    return await api()
        .get<ListDto<TVShow>>(routes.tv.byId(showId).similar())
        .then((r) => r.data.results);
}

async function getTVShowsCredits(showId: number): Promise<PeopleCreditsDto> {
    return await api()
        .get<PeopleCreditsDto>(routes.tv.byId(showId).credits)
        .then((r) => r.data);
}

export { getTVShowDetails, getSimilarTVShows, getTVShowsCredits };
