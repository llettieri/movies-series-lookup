import { SimpleCollection } from '@/models/dto/movie-dto';
import { Genre } from '@/models/genre';
import { MediaType } from '@/models/media-type';

export interface Media {
    averageVote: number;
    backdrop: string | undefined;
    collection: SimpleCollection | undefined;
    genres: Genre[];
    homepage?: string;
    id: string;
    mediaType: MediaType;
    overview: string;
    poster: string | undefined;
    releaseDate: string | undefined;
    runtime?: number;
    title: string;
}
