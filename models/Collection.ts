import { Media } from '@/models/Media';

export interface Collection {
    id: string;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: Media[];
}
