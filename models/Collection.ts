import { Media } from '@/models/Media';

export interface Collection {
    id: string;
    name: string;
    overview: string;
    parts: Media[];
    poster?: string;
    backdrop?: string;
}
