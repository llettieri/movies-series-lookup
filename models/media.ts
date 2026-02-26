import { SimpleCollection } from '@/models/dto/movie-dto';
import { Genre } from '@/models/genre';
import { Item } from '@/models/base';

export interface Media extends Item {
    averageVote: number;
    backdrop: string;
    collection?: SimpleCollection;
    genres: Genre[];
    homepage?: string;
    overview: string;
    poster: string;
    releaseDate?: string;
    runtime?: number;
    title: string;
}
