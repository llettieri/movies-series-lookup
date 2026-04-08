// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailLayout } from '@/components/detail-layout';

const baseProps = {
    backdrop: '/backdrop.jpg',
    image: '/poster.jpg',
    imageAspect: 'portrait' as const,
    alt: 'Test Movie poster',
    title: 'Inception',
    rating: 88,
    description: 'A thief who steals corporate secrets.',
    metadata: [{ label: 'Release', value: 'July 16, 2010' }],
};

describe('DetailLayout — banner + peek mode (backdrop present, 2/3 image)', () => {
    it('renders the title', () => {
        render(
            <DetailLayout {...baseProps}>
                <div />
            </DetailLayout>,
        );
        expect(screen.getByText('Inception')).toBeInTheDocument();
    });

    it('renders the description', () => {
        render(
            <DetailLayout {...baseProps}>
                <div />
            </DetailLayout>,
        );
        expect(
            screen.getByText('A thief who steals corporate secrets.'),
        ).toBeInTheDocument();
    });

    it('renders metadata rows', () => {
        render(
            <DetailLayout {...baseProps}>
                <div />
            </DetailLayout>,
        );
        expect(screen.getByText('Release:')).toBeInTheDocument();
        expect(screen.getByText('July 16, 2010')).toBeInTheDocument();
    });

    it('renders the backdrop image', () => {
        render(
            <DetailLayout {...baseProps}>
                <div />
            </DetailLayout>,
        );
        expect(screen.getByAltText('Test Movie poster')).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
        render(
            <DetailLayout {...baseProps} subtitle="The Dream-Share Collection">
                <div />
            </DetailLayout>,
        );
        expect(
            screen.getByText('The Dream-Share Collection'),
        ).toBeInTheDocument();
    });

    it('renders a linked title when homepage is provided', () => {
        render(
            <DetailLayout {...baseProps} homepage="https://example.com">
                <div />
            </DetailLayout>,
        );
        const link = screen.getByRole('link', { name: 'Inception' });
        expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('renders children', () => {
        render(
            <DetailLayout {...baseProps}>
                <p>Watch Providers</p>
            </DetailLayout>,
        );
        expect(screen.getByText('Watch Providers')).toBeInTheDocument();
    });
});

describe('DetailLayout — side-by-side mode (no backdrop)', () => {
    const sideBySideProps = { ...baseProps, backdrop: null };

    it('renders the title', () => {
        render(
            <DetailLayout {...sideBySideProps}>
                <div />
            </DetailLayout>,
        );
        expect(screen.getByText('Inception')).toBeInTheDocument();
    });

    it('renders metadata rows', () => {
        render(
            <DetailLayout {...sideBySideProps}>
                <div />
            </DetailLayout>,
        );
        expect(screen.getByText('Release:')).toBeInTheDocument();
        expect(screen.getByText('July 16, 2010')).toBeInTheDocument();
    });

    it('renders the image', () => {
        render(
            <DetailLayout {...sideBySideProps}>
                <div />
            </DetailLayout>,
        );
        expect(screen.getByAltText('Test Movie poster')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <DetailLayout {...sideBySideProps}>
                <p>Similar Movies</p>
            </DetailLayout>,
        );
        expect(screen.getByText('Similar Movies')).toBeInTheDocument();
    });
});

describe('DetailLayout — banner-only mode (backdrop present, 16/9 image)', () => {
    const episodeProps = {
        ...baseProps,
        image: '/still.jpg',
        imageAspect: 'landscape' as const,
        alt: 'Pilot still',
        title: 'Pilot',
        description: 'Walter White is diagnosed.',
    };

    it('renders the title', () => {
        render(
            <DetailLayout {...episodeProps}>
                <div />
            </DetailLayout>,
        );
        expect(screen.getByText('Pilot')).toBeInTheDocument();
    });

    it('renders the description', () => {
        render(
            <DetailLayout {...episodeProps}>
                <div />
            </DetailLayout>,
        );
        expect(
            screen.getByText('Walter White is diagnosed.'),
        ).toBeInTheDocument();
    });
});
