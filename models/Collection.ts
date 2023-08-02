import { Media } from '@/models/Media';

export interface Collection {
    id: string;
    name: string;
    overview: string;
    poster: string;
    backdrop: string;
    parts: Media[];
}
