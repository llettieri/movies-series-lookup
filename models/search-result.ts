import { Person } from '@/models/person';
import { Media } from '@/models/media';

export interface SearchResult {
    items: (Media | Person)[];
    total: number;
    pages: number;
}

export const EMPTY_SEARCH_RESULT: SearchResult = {
    items: [],
    total: 0,
    pages: 1,
};
