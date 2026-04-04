import { describe, it, expect } from 'vitest';
import {
    getPersonDetails,
    getPersonMovies,
    getPersonTVShows,
} from '@/services/person-service';

describe('getPersonDetails', () => {
    it('returns a parsed person model', async () => {
        const result = await getPersonDetails('person-1');
        expect(result.id).toBe('person-1');
        expect(result.name).toBe('Test Person');
        expect(result.type).toBe('person');
    });
});

describe('getPersonMovies', () => {
    it('returns a deduplicated array of parsed movies', async () => {
        const result = await getPersonMovies('person-1');
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].type).toBe('movie');
    });
});

describe('getPersonTVShows', () => {
    it('returns a deduplicated array of parsed TV shows', async () => {
        const result = await getPersonTVShows('person-1');
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].type).toBe('show');
    });
});
