import { Media } from '@/models/media';
import { Item } from '@/models/base';

export interface Collection extends Item {
    name: string;
    overview: string;
    parts: Media[];
    poster: string;
    backdrop?: string;
}
