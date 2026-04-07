import { describe, expect, it } from 'vitest';
import {
    getAiringTodayShows,
    getPopularShows,
    getSimilarTVShows,
    getTVShowDetails,
    getTVShowCredits,
    getTVShowWatchProviders,
    getTVShowSeasonDetails,
    getTVShowSeasonCredits,
    getTVShowSeasonWatchProviders,
    getTVShowSeasonEpisodeDetails,
    getTVShowSeasonEpisodeCredits,
} from '@/services/tv-show-service';

describe('getTVShowDetails', () => {
    it('returns a parsed TV show model', async () => {
        const result = await getTVShowDetails('show-1');
        expect(result.id).toBe('show-1');
        expect(result.title).toBe('Test Show');
        expect(result.type).toBe('show');
        expect(result.averageVote).toBe(82);
    });
});

describe('getPopularShows', () => {
    it('returns an array of parsed TV shows', async () => {
        const result = await getPopularShows('US');
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('show');
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

describe('getTVShowCredits', () => {
    it('returns cast and crew arrays', async () => {
        const result = await getTVShowCredits('show-1');
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

describe('getTVShowSeasonDetails', () => {
    it('returns a parsed season model', async () => {
        const result = await getTVShowSeasonDetails('show-1', 1);
        expect(result.id).toBe('season-1');
        expect(result.type).toBe('showSeason');
        expect(result.averageVote).toBe(80);
        expect(result.episodeCount).toBe(2);
    });
});

describe('getTVShowSeasonCredits', () => {
    it('returns cast and crew arrays', async () => {
        const result = await getTVShowSeasonCredits('show-1', 1);
        expect(result.cast).toHaveLength(1);
        expect(result.crew).toHaveLength(1);
    });
});

describe('getTVShowSeasonWatchProviders', () => {
    it('returns providers for the given locale', async () => {
        const result = await getTVShowSeasonWatchProviders('show-1', 1, 'US');
        expect(result).toBeDefined();
        expect(result!.providers[0].name).toBe('Netflix');
    });

    it('returns undefined when locale is not in results', async () => {
        const result = await getTVShowSeasonWatchProviders('show-1', 1, 'FR');
        expect(result).toBeUndefined();
    });
});

describe('getTVShowSeasonEpisodeDetails', () => {
    it('returns a parsed episode model', async () => {
        const result = await getTVShowSeasonEpisodeDetails('show-1', 1, 1);
        expect(result.id).toBe('episode-1');
        expect(result.type).toBe('showSeasonEpisode');
        expect(result.averageVote).toBe(80);
        expect(result.showId).toBe('show-1');
        expect(result.seasonNumber).toBe(1);
        expect(result.episodeNumber).toBe(1);
        expect(result.episodeType).toBe('standard');
    });
});

describe('getTVShowSeasonEpisodeCredits', () => {
    it('returns cast and crew arrays', async () => {
        const result = await getTVShowSeasonEpisodeCredits('show-1', 1, 1);
        expect(result.cast).toHaveLength(1);
        expect(result.crew).toHaveLength(1);
    });
});
