/* eslint-disable camelcase */
import type { CollectionDto } from '@/models/dto/collection-dto';

export const collectionFixture: CollectionDto = {
    id: 'col-1',
    name: 'Test Collection',
    overview: 'A test collection overview.',
    poster_path: '/col-poster.jpg',
    backdrop_path: '/col-backdrop.jpg',
    parts: [
        {
            backdrop_path: '/part-backdrop.jpg',
            id: 'movie-1',
            media_type: 'movie',
            overview: 'Part 1 overview.',
            poster_path: '/part-poster.jpg',
            release_date: '2020-01-01',
            title: 'Test Movie Part 1',
            vote_average: 7.0,
        },
    ],
};
