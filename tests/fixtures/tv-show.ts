/* eslint-disable camelcase */
import type { TVShowDto } from '@/models/dto/tv-show-dto';
import type { ListDto } from '@/models/dto/list-dto';

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
    vote_average: 8.2,
};

export const tvShowListFixture: ListDto<TVShowDto> = {
    page: 1,
    results: [tvShowFixture],
    total_pages: 3,
    total_results: 30,
};
