import { Genre } from '@/models/Genre';

export interface SimpleCollection {
    id: string;
    name: string;
}

export interface MovieDto {
    id: string;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    homepage: string;
    genres: Genre[];
    release_date: string;
    runtime: number;
    belongs_to_collection: SimpleCollection;
}
