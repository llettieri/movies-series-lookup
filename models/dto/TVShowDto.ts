import { Genre } from '@/models/Genre';
import { Network } from '@/models/Network';

export interface TVShowDto {
    backdrop_path: string;
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: string;
    in_production: boolean;
    last_air_date: string;
    name: string;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    overview: string;
    poster: string;
    poster_path: string;
}
