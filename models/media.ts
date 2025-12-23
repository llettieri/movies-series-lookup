import { SimpleCollection } from '@/models/dto/movie-dto';
import { Genre } from '@/models/genre';
import { MediaType } from '@/models/media-type';

export interface Media {
    averageVote: number;
    backdrop?: string;
    collection?: SimpleCollection;
    genres: Genre[];
    homepage?: string;
    id: string;
    mediaType: MediaType;
    overview: string;
    poster: string;
    releaseDate?: string;
    runtime?: number;
    title: string;
}
