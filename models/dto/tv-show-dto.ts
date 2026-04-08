import { NetworkDto } from '@/models/dto/network-dto';
import { Genre } from '@/models/genre';

interface TVShowDto {
    backdrop_path?: string;
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: string;
    in_production: boolean;
    last_air_date: string;
    name: string;
    networks: NetworkDto[] | null;
    number_of_episodes: number;
    number_of_seasons: number;
    overview: string;
    poster_path?: string;
    seasons?: ReducedTVShowSeasonDto[];
    vote_average: number;
}

interface TVShowSeasonDto {
    air_date: string;
    episodes: TVShowSeasonEpisodeDto[];
    id: string;
    name: string;
    networks: NetworkDto[] | null;
    overview: string;
    poster_path?: string;
    season_number: number;
    vote_average: number;
}

interface ReducedTVShowSeasonDto {
    air_date: string;
    episode_count: number;
    id: string;
    name: string;
    overview: string;
    poster_path?: string;
    season_number: number;
    vote_average: number;
}

interface TVShowSeasonEpisodeDto {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: string;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: string;
    still_path?: string;
    vote_average: number;
}

export type {
    TVShowDto,
    TVShowSeasonDto,
    ReducedTVShowSeasonDto,
    TVShowSeasonEpisodeDto,
};
