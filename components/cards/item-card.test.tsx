// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ItemCard } from '@/components/cards/item-card';
import type { Media } from '@/models/media';
import type { Person } from '@/models/person';
import type {
    ReducedTVShowSeason,
    TVShowSeasonEpisode,
} from '@/models/tv-show';

const movieItem: Media = {
    averageVote: 75,
    backdrop: '/backdrop.jpg',
    collection: undefined,
    genres: [],
    homepage: '',
    id: 'movie-1',
    overview: 'An overview.',
    poster: '/poster.jpg',
    releaseDate: '2024-01-15',
    runtime: 120,
    title: 'Test Movie',
    type: 'movie',
};

const tvItem: Media = {
    ...movieItem,
    id: 'show-1',
    title: 'Test Show',
    type: 'show',
};

const showSeasonItem: ReducedTVShowSeason = {
    ...tvItem,
    id: 'season-1',
    title: 'Season 1',
    type: 'showSeason',
    seasonNumber: 1,
    showId: 'show-1',
    episodeCount: 10,
};

const showSeasonEpisodeItem: TVShowSeasonEpisode = {
    ...tvItem,
    id: 'episode-1',
    title: 'Pilot',
    type: 'showSeasonEpisode',
    episodeNumber: 1,
    episodeType: 'standard',
    seasonNumber: 1,
    showId: 'show-1',
};

const personItem: Person = {
    biography: 'A bio.',
    birthday: '1990-01-01',
    deathday: '',
    department: 'Acting',
    gender: 2,
    homepage: '',
    id: 'person-1',
    jobs: undefined,
    name: 'Test Person',
    portrait: '/profile.jpg',
    roles: [{ name: 'Hero', episodeCount: NaN }],
    type: 'person',
};

describe('ItemCard — movie', () => {
    it('renders the movie title', () => {
        render(<ItemCard item={movieItem} size="normal" />);
        expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    it('links to the movie detail page', () => {
        render(<ItemCard item={movieItem} size="normal" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/movies/movie-1');
    });

    it('renders the poster image with alt text', () => {
        render(<ItemCard item={movieItem} size="normal" />);
        expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
    });
});

describe('ItemCard — TV show', () => {
    it('renders the show title', () => {
        render(<ItemCard item={tvItem} size="normal" />);
        expect(screen.getByText('Test Show')).toBeInTheDocument();
    });

    it('links to the TV show detail page', () => {
        render(<ItemCard item={tvItem} size="normal" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/tv-shows/show-1');
    });
});

describe('ItemCard — TV show season', () => {
    it('renders the season title', () => {
        render(<ItemCard item={showSeasonItem} size="normal" />);
        expect(screen.getByText('Season 1')).toBeInTheDocument();
    });

    it('links to the season detail page', () => {
        render(<ItemCard item={showSeasonItem} size="normal" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/tv-shows/show-1/seasons/1');
    });
});

describe('ItemCard — TV show season episode', () => {
    it('renders the episode title', () => {
        render(<ItemCard item={showSeasonEpisodeItem} size="normal" />);
        expect(screen.getByText('Pilot')).toBeInTheDocument();
    });

    it('links to the episode detail page', () => {
        render(<ItemCard item={showSeasonEpisodeItem} size="normal" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute(
            'href',
            '/tv-shows/show-1/seasons/1/episodes/1',
        );
    });
});

describe('ItemCard — person', () => {
    it('renders the person name', () => {
        render(<ItemCard item={personItem} size="normal" />);
        expect(screen.getByText('Test Person')).toBeInTheDocument();
    });

    it('links to the person detail page', () => {
        render(<ItemCard item={personItem} size="normal" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/people/person-1');
    });

    it('renders the portrait image with alt text', () => {
        render(<ItemCard item={personItem} size="normal" />);
        expect(screen.getByAltText('Test Person')).toBeInTheDocument();
    });
});
