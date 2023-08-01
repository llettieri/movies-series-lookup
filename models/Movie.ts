import { Media } from '@/models/Media';

export interface Collection {
    id: string;
    name: string;
}

export interface Movie extends Media {
    release_date: string;
    runtime: number;
    belongs_to_collection: Collection;
}
