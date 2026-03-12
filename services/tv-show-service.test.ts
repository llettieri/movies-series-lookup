import { describe, expect, it } from 'vitest';
import {
    getAiringTodayShows,
    getPopularShows,
    getSimilarTVShows,
    getTVShowDetails,
    getTVShowsCredits,
    getTVShowWatchProviders,
} from '@/services/tv-show-service';

describe('getTVShowDetails', () => {
    it('returns a parsed TV show model', async () => {
        const result = await getTVShowDetails('show-1');
        expect(result.id).toBe('show-1');
        expect(result.title).toBe('Test Show');
        expect(result.type).toBe('tv');
        expect(result.averageVote).toBe(82);
    });
});

describe('getPopularShows', () => {
    it('returns an array of parsed TV shows', async () => {
        const result = await getPopularShows('US');
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('tv');
    });
});

describe('getAiringTodayShows', () => {
    it('returns an array of parsed TV shows', async () => {
        const result = await getAiringTodayShows('US');
        expect(result).toHaveLength(1);
    });
});

describe('getSimilarTVShows', () => {
    it('returns an array of parsed TV shows', async () => {
        const result = await getSimilarTVShows('show-1');
        expect(result).toHaveLength(1);
    });
});

describe('getTVShowsCredits', () => {
    it('returns cast and crew arrays', async () => {
        const result = await getTVShowsCredits('show-1');
        expect(result.cast).toHaveLength(1);
        expect(result.crew).toHaveLength(1);
    });
});

describe('getTVShowWatchProviders', () => {
    it('returns providers for the given locale', async () => {
        const result = await getTVShowWatchProviders('show-1', 'US');
        expect(result).toBeDefined();
        expect(result!.providers[0].name).toBe('Netflix');
    });

    it('returns undefined when locale is not in results', async () => {
        const result = await getTVShowWatchProviders('show-1', 'FR');
        expect(result).toBeUndefined();
    });
});
