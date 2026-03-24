/* eslint-disable camelcase */
import type { MovieDto } from '@/models/dto/movie-dto';
import type { ListDto } from '@/models/dto/list-dto';

export const movieFixture: MovieDto = {
    backdrop_path: '/backdrop.jpg',
    belongs_to_collection: { id: 'col-1', name: 'Test Collection' },
    genres: [{ id: '28', type: 'genre', name: 'Action' }],
    homepage: 'https://example.com',
    id: 'movie-1',
    overview: 'A test movie overview.',
    poster_path: '/poster.jpg',
    release_date: '2024-01-15',
    runtime: 120,
    title: 'Test Movie',
    vote_average: 7.5,
};

export const movieListFixture: ListDto<MovieDto> = {
    page: 1,
    results: [movieFixture],
    total_pages: 5,
    total_results: 50,
};
