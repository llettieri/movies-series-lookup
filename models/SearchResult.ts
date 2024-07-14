import { Media } from '@/models/Media';
import { Person } from '@/models/Person';

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
