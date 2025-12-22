import { Media } from '@/models/media';
import { Person } from '@/models/person';

export interface SearchResult {
    medias: Media[];
    people: Person[];
    total: number;
}

export const EMPTY_SEARCH_RESULT: SearchResult = {
    medias: [],
    people: [],
    total: 0,
};
