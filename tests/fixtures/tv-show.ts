/* eslint-disable camelcase */
import type {
    ReducedTVShowSeasonDto,
    TVShowDto,
    TVShowSeasonDto,
    TVShowSeasonEpisodeDto,
} from '@/models/dto/tv-show-dto';
import type { ListDto } from '@/models/dto/list-dto';

export const tvShowSeasonEpisodeFixture: TVShowSeasonEpisodeDto = {
    air_date: '2023-03-01',
    episode_number: 1,
    episode_type: 'standard',
    id: 'episode-1',
    name: 'Pilot',
    overview: 'A test episode overview.',
    production_code: 'TEST',
    runtime: 30,
    season_number: 1,
    show_id: 'show-1',
    still_path: '/episode-still.jpg',
    vote_average: 8.0,
};

export const reducedTVShowSeasonFixture: ReducedTVShowSeasonDto = {
    air_date: '2023-03-01',
    episode_count: 10,
    id: 'season-1',
    name: 'Season 1',
    overview: 'A test season overview.',
    poster_path: '/season-poster.jpg',
    season_number: 1,
    vote_average: 8.0,
};

export const tvShowSeasonFixture: TVShowSeasonDto = {
    air_date: '2023-03-01',
    episodes: [tvShowSeasonEpisodeFixture, tvShowSeasonEpisodeFixture],
    id: 'season-1',
    name: 'Season 1',
    networks: [
        {
            id: 'net-1',
            name: 'HBO',
            logo_path: '/logo.jpg',
            origin_country: 'US',
            homepage: 'https://hbo.com',
        },
    ],
    overview: 'A test season overview.',
    poster_path: '/season-poster.jpg',
    season_number: 1,
    vote_average: 8.0,
};

export const tvShowFixture: TVShowDto = {
    backdrop_path: '/backdrop.jpg',
    first_air_date: '2023-03-01',
    genres: [{ id: '18', type: 'genre', name: 'Action' }],
    homepage: 'https://example.com',
    id: 'show-1',
    in_production: true,
    last_air_date: '2024-01-01',
    name: 'Test Show',
    networks: [
        {
            id: 'net-1',
            name: 'HBO',
            logo_path: '/logo.jpg',
            origin_country: 'US',
            homepage: 'https://hbo.com',
        },
    ],
    number_of_episodes: 24,
    number_of_seasons: 2,
    overview: 'A test show overview.',
    poster_path: '/poster.jpg',
    seasons: [reducedTVShowSeasonFixture],
    vote_average: 8.2,
};

export const tvShowListFixture: ListDto<TVShowDto> = {
    page: 1,
    results: [tvShowFixture],
    total_pages: 3,
    total_results: 30,
};
