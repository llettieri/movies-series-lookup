/* eslint-disable camelcase */
import { describe, expect, it } from 'vitest';
import {
    parseCollectionDto,
    parseCreditsDto,
    parseMovieDto,
    parseMultiMediaDto,
    parsePersonDto,
    parseProviderDto,
    parseTVShowDto,
} from '@/services/parse-service';
import { movieFixture } from '../tests/fixtures/movie';
import { tvShowFixture } from '../tests/fixtures/tv-show';
import {
    creditsFixture,
    crewPersonFixture,
    personFixture,
} from '../tests/fixtures/person';
import { collectionFixture } from '../tests/fixtures/collection';

// ─── parseMovieDto ────────────────────────────────────────────────────────────

describe('parseMovieDto', () => {
    it('maps all fields from the DTO', () => {
        const result = parseMovieDto(movieFixture);

        expect(result.id).toBe('movie-1');
        expect(result.title).toBe('Test Movie');
        expect(result.overview).toBe('A test movie overview.');
        expect(result.releaseDate).toBe('2024-01-15');
        expect(result.runtime).toBe(120);
        expect(result.homepage).toBe('https://example.com');
        expect(result.type).toBe('movie');
    });

    it('multiplies vote_average by 10 to produce averageVote', () => {
        const result = parseMovieDto(movieFixture);
        expect(result.averageVote).toBe(75); // 7.5 * 10
    });

    it('uses poster_path when present', () => {
        const result = parseMovieDto(movieFixture);
        expect(result.poster).toBe('/poster.jpg');
    });

    it('falls back to FALLBACK_IMAGE when poster_path is missing', () => {
        const result = parseMovieDto({
            ...movieFixture,
            poster_path: undefined,
        });
        expect(result.poster).toBe('/fallback.png');
    });

    it('uses backdrop_path when present', () => {
        const result = parseMovieDto(movieFixture);
        expect(result.backdrop).toBe('/backdrop.jpg');
    });

    it('falls back to FALLBACK_IMAGE when backdrop_path is missing', () => {
        const result = parseMovieDto({
            ...movieFixture,
            backdrop_path: undefined,
        });
        expect(result.backdrop).toBe('/fallback.png');
    });

    it('includes belongs_to_collection', () => {
        const result = parseMovieDto(movieFixture);
        expect(result.collection).toEqual({
            id: 'col-1',
            name: 'Test Collection',
        });
    });

    it('includes genres', () => {
        const result = parseMovieDto(movieFixture);
        expect(result.genres).toEqual([
            { id: '28', type: 'genre', name: 'Action' },
        ]);
    });
});

// ─── parseTVShowDto ───────────────────────────────────────────────────────────

describe('parseTVShowDto', () => {
    it('maps all fields from the DTO', () => {
        const result = parseTVShowDto(tvShowFixture);

        expect(result.id).toBe('show-1');
        expect(result.title).toBe('Test Show'); // maps name → title
        expect(result.releaseDate).toBe('2023-03-01'); // maps first_air_date → releaseDate
        expect(result.lastAirDate).toBe('2024-01-01');
        expect(result.episodeCount).toBe(24);
        expect(result.seasonsCount).toBe(2);
        expect(result.inProduction).toBe(true);
        expect(result.type).toBe('tv');
    });

    it('multiplies vote_average by 10', () => {
        const result = parseTVShowDto(tvShowFixture);
        expect(result.averageVote).toBe(82);
    });

    it('falls back to FALLBACK_IMAGE when poster_path is missing', () => {
        const result = parseTVShowDto({
            ...tvShowFixture,
            poster_path: undefined,
        });
        expect(result.poster).toBe('/fallback.png');
    });

    it('parses networks', () => {
        const result = parseTVShowDto(tvShowFixture);
        expect(result.networks).toHaveLength(1);
        expect(result.networks[0].name).toBe('HBO');
        expect(result.networks[0].type).toBe('network');
    });

    it('handles null networks gracefully', () => {
        const result = parseTVShowDto({ ...tvShowFixture, networks: null });
        expect(result.networks).toEqual([]);
    });

    it('collection is always undefined for TV shows', () => {
        const result = parseTVShowDto(tvShowFixture);
        expect(result.collection).toBeUndefined();
    });
});

// ─── parsePersonDto ───────────────────────────────────────────────────────────

describe('parsePersonDto', () => {
    it('maps all fields from the DTO', () => {
        const result = parsePersonDto(personFixture);

        expect(result.id).toBe('person-1');
        expect(result.name).toBe('Test Person');
        expect(result.biography).toBe('A test biography.');
        expect(result.birthday).toBe('1990-01-01');
        expect(result.gender).toBe(2);
        expect(result.type).toBe('person');
        expect(result.department).toBe('Acting');
    });

    it('uses profile_path when present', () => {
        const result = parsePersonDto(personFixture);
        expect(result.portrait).toBe('/profile.jpg');
    });

    it('falls back to FALLBACK_IMAGE when profile_path is missing', () => {
        const result = parsePersonDto({
            ...personFixture,
            profile_path: undefined,
        });
        expect(result.portrait).toBe('/fallback.png');
    });

    it('produces a role from character field when present', () => {
        const result = parsePersonDto(personFixture); // character: 'Test Character'
        expect(result.roles).toHaveLength(1);
        expect(result.roles![0].name).toBe('Test Character');
        // episodeCount is NaN when built from the character string field (no episode count available)
        expect(result.roles![0].episodeCount).toBeNaN();
    });

    it('produces a job from job field when present', () => {
        const result = parsePersonDto(crewPersonFixture); // job: 'Director'
        expect(result.jobs).toHaveLength(1);
        expect(result.jobs![0].name).toBe('Director');
        // episodeCount is NaN when built from the job string field
        expect(result.jobs![0].episodeCount).toBeNaN();
    });

    it('uses department field when known_for_department is absent', () => {
        const result = parsePersonDto({
            ...crewPersonFixture,
            known_for_department: undefined,
        });
        expect(result.department).toBe('Directing');
    });
});

// ─── parseCreditsDto ──────────────────────────────────────────────────────────

describe('parseCreditsDto', () => {
    it('maps cast and crew arrays', () => {
        const result = parseCreditsDto(creditsFixture);

        expect(result.cast).toHaveLength(1);
        expect(result.cast[0].name).toBe('Test Person');
        expect(result.crew).toHaveLength(1);
        expect(result.crew[0].name).toBe('Test Director');
    });
});

// ─── parseCollectionDto ───────────────────────────────────────────────────────

describe('parseCollectionDto', () => {
    it('maps all fields from the DTO', () => {
        const result = parseCollectionDto(collectionFixture);

        expect(result.id).toBe('col-1');
        expect(result.name).toBe('Test Collection');
        expect(result.overview).toBe('A test collection overview.');
        expect(result.type).toBe('collection');
    });

    it('parses parts as media items', () => {
        const result = parseCollectionDto(collectionFixture);
        expect(result.parts).toHaveLength(1);
        expect(result.parts[0].title).toBe('Test Movie Part 1');
        expect(result.parts[0].type).toBe('movie');
    });

    it('falls back to FALLBACK_IMAGE when poster_path is missing', () => {
        const result = parseCollectionDto({
            ...collectionFixture,
            poster_path: undefined,
        });
        expect(result.poster).toBe('/fallback.png');
    });
});

// ─── parseProviderDto ─────────────────────────────────────────────────────────

describe('parseProviderDto', () => {
    it('maps all fields from the DTO', () => {
        const providerDto = {
            display_priority: 1,
            logo_path: '/netflix.jpg',
            provider_id: 8,
            provider_name: 'Netflix',
        };

        const result = parseProviderDto(providerDto);

        expect(result.id).toBe('8');
        expect(result.name).toBe('Netflix');
        expect(result.logo).toBe('/netflix.jpg');
        expect(result.displayPriority).toBe(1);
        expect(result.type).toBe('provider');
    });

    it('converts numeric provider_id to string', () => {
        const result = parseProviderDto({
            display_priority: 0,
            logo_path: '',
            provider_id: 42,
            provider_name: 'X',
        });
        expect(result.id).toBe('42');
    });
});

// ─── parseMultiMediaDto ───────────────────────────────────────────────────────

describe('parseMultiMediaDto', () => {
    it('maps movie media_type', () => {
        const dto = { ...movieFixture, media_type: 'movie' };
        const result = parseMultiMediaDto(dto);
        expect(result.type).toBe('movie');
        expect(result.title).toBe('Test Movie');
    });

    it('maps tv media_type using name field', () => {
        const dto = {
            backdrop_path: '/b.jpg',
            id: 'tv-1',
            media_type: 'tv',
            name: 'TV Show Name',
            overview: 'overview',
            poster_path: '/p.jpg',
            vote_average: 8.0,
            first_air_date: '2023-01-01',
        };
        const result = parseMultiMediaDto(dto);
        expect(result.type).toBe('tv');
        expect(result.title).toBe('TV Show Name');
    });

    it('falls back to empty string when both title and name are absent', () => {
        const dto = {
            id: 'x',
            media_type: 'movie',
            overview: '',
            vote_average: 0,
        };
        const result = parseMultiMediaDto(dto);
        expect(result.title).toBe('');
    });
});
