// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CreditsTable } from '@/components/credits-table';
import type { Person } from '@/models/person';

const castMember: Person = {
    biography: '',
    birthday: '',
    deathday: '',
    department: 'Acting',
    gender: 2,
    homepage: '',
    id: 'person-1',
    jobs: undefined,
    name: 'Test Actor',
    portrait: '/profile.jpg',
    roles: [{ name: 'Hero', episodeCount: NaN }],
    type: 'person',
};

const crewMember: Person = {
    biography: '',
    birthday: '',
    deathday: '',
    department: 'Directing',
    gender: 1,
    homepage: '',
    id: 'person-2',
    jobs: [{ name: 'Director', episodeCount: NaN }],
    name: 'Test Director',
    portrait: '/director.jpg',
    roles: undefined,
    type: 'person',
};

describe('CreditsTable — movie', () => {
    it('renders "Movie Cast" heading', () => {
        render(
            <CreditsTable
                cast={[castMember]}
                crew={[crewMember]}
                title="Movie"
            />,
        );
        expect(screen.getByText(/Movie Cast/i)).toBeInTheDocument();
    });

    it('renders "Movie Crew" heading', () => {
        render(
            <CreditsTable
                cast={[castMember]}
                crew={[crewMember]}
                title="Movie"
            />,
        );
        expect(screen.getByText(/Movie Crew/i)).toBeInTheDocument();
    });

    it('shows cast count', () => {
        render(<CreditsTable cast={[castMember]} crew={[]} title="Movie" />);
        expect(screen.getByText('(1)')).toBeInTheDocument();
    });

    it('renders cast member names', () => {
        render(<CreditsTable cast={[castMember]} crew={[]} title="Movie" />);
        expect(screen.getByText('Test Actor')).toBeInTheDocument();
    });

    it('renders crew member names', () => {
        render(<CreditsTable cast={[]} crew={[crewMember]} title="Movie" />);
        expect(screen.getByText('Test Director')).toBeInTheDocument();
    });
});

describe('CreditsTable — TV show', () => {
    it('renders "TV Show Cast" heading', () => {
        render(<CreditsTable cast={[]} crew={[]} title="TV Show" />);
        expect(screen.getByText(/TV Show Cast/i)).toBeInTheDocument();
    });
});

describe('CreditsTable — empty state', () => {
    it('renders with empty cast and crew without crashing', () => {
        render(<CreditsTable cast={[]} crew={[]} title="Movie" />);
        // Both cast and crew show (0), so there are two matching spans
        const counts = screen.getAllByText('(0)');
        expect(counts.length).toBeGreaterThanOrEqual(1);
    });
});
