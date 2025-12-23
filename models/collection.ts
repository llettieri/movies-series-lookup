import { Media } from '@/models/media';

export interface Collection {
    id: string;
    name: string;
    overview: string;
    parts: Media[];
    poster: string;
    backdrop?: string;
}
