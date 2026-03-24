import { describe, it, expect } from 'vitest';
import {
    getMovieDetails,
    getPopularMovies,
    getLatestMovies,
    getSimilarMovies,
    getMovieCredits,
    getMovieWatchProviders,
} from '@/services/movie-service';

describe('getMovieDetails', () => {
    it('returns a parsed movie model', async () => {
        const result = await getMovieDetails('movie-1');
        expect(result.id).toBe('movie-1');
        expect(result.title).toBe('Test Movie');
        expect(result.type).toBe('movie');
        expect(result.averageVote).toBe(75);
    });
});

describe('getPopularMovies', () => {
    it('returns an array of parsed movies', async () => {
        const result = await getPopularMovies('US');
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('movie');
    });
});

describe('getLatestMovies', () => {
    it('returns an array of parsed movies', async () => {
        const result = await getLatestMovies('US');
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('movie');
    });
});

describe('getSimilarMovies', () => {
    it('returns an array of parsed movies', async () => {
        const result = await getSimilarMovies('movie-1');
        expect(result).toHaveLength(1);
    });
});

describe('getMovieCredits', () => {
    it('returns cast and crew arrays', async () => {
        const result = await getMovieCredits('movie-1');
        expect(result.cast).toHaveLength(1);
        expect(result.cast[0].name).toBe('Test Person');
        expect(result.crew).toHaveLength(1);
    });
});

describe('getMovieWatchProviders', () => {
    it('returns providers for the given locale', async () => {
        const result = await getMovieWatchProviders('movie-1', 'US');
        expect(result).toBeDefined();
        expect(result!.providers).toHaveLength(1);
        expect(result!.providers[0].name).toBe('Netflix');
    });

    it('returns undefined when locale is not in results', async () => {
        const result = await getMovieWatchProviders('movie-1', 'FR');
        expect(result).toBeUndefined();
    });
});
