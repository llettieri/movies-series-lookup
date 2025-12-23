import { Genre } from '@/models/genre';

export interface SimpleCollection {
    id: string;
    name: string;
}

export interface MovieDto {
    backdrop_path?: string;
    belongs_to_collection: SimpleCollection;
    genres: Genre[];
    homepage: string;
    id: string;
    overview: string;
    poster_path?: string;
    release_date: string;
    runtime: number;
    title: string;
    vote_average: number;
}
