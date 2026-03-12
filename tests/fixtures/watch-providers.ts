/* eslint-disable camelcase */
import type { WatchProvidersDto } from '@/models/dto/watch-providers-dto';

export const watchProvidersFixture: WatchProvidersDto = {
    id: 'movie-1',
    results: {
        US: {
            link: 'https://www.themoviedb.org/movie/1/watch',
            flatrate: [
                {
                    display_priority: 1,
                    logo_path: '/netflix.jpg',
                    provider_id: 8,
                    provider_name: 'Netflix',
                },
            ],
        },
    },
};
