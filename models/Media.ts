import { Genre } from '@/models/Genre';

export interface Media {
    id: string;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    homepage: string;
    genres: Genre[];
    media_type: string;
}
