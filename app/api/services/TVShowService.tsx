import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { PeopleCreditsDto } from '@/models/dto/PeopleCreditsDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { MediaType } from '@/models/MediaType';
import { TVShow } from '@/models/TVShow';
import { parseTemplate } from 'url-template';

async function getTVShowDetails(showId: number): Promise<TVShow> {
    const url = parseTemplate(routes.tv.byId.details).expand({ id: showId });
    return await api()
        .get<TVShowDto>(url)
        .then((r) => parseTVShowDto(r.data));
}

async function getSimilarTVShows(showId: number): Promise<TVShow[]> {
    const url = parseTemplate(routes.tv.byId.similar).expand({ id: showId });
    return await api()
        .get<ListDto<TVShowDto>>(url)
        .then((r) => r.data.results.map(parseTVShowDto));
}

async function getTVShowsCredits(showId: number): Promise<PeopleCreditsDto> {
    const url = parseTemplate(routes.tv.byId.credits).expand({ id: showId });
    return await api()
        .get<PeopleCreditsDto>(url)
        .then((r) => r.data);
}

function parseTVShowDto(s: TVShowDto): TVShow {
    return {
        backdrop: s.backdrop_path
            ? `${routes.images}${s.backdrop_path}`
            : undefined,
        collection: undefined,
        genres: s.genres,
        homepage: s.homepage,
        id: s.id,
        mediaType: MediaType.TV,
        overview: s.overview,
        poster: s.poster_path ? `${routes.images}${s.poster_path}` : undefined,
        releaseDate: s.first_air_date,
        lastAirDate: s.last_air_date,
        networks: s.networks,
        seasonsCount: s.number_of_seasons,
        inProduction: s.in_production,
        episodesCount: s.number_of_episodes,
        title: s.name,
    };
}

export {
    getTVShowDetails,
    getSimilarTVShows,
    getTVShowsCredits,
    parseTVShowDto,
};
