import { SimpleCollection } from '@/models/dto/MovieDto';
import { Genre } from '@/models/Genre';
import { MediaType } from '@/models/MediaType';

export interface Media {
    backdrop: string | undefined;
    collection: SimpleCollection | undefined;
    genres: Genre[];
    homepage: string;
    id: string;
    mediaType: MediaType;
    overview: string;
    poster: string | undefined;
    releaseDate: string;
    runtime?: number;
    title: string;
}
