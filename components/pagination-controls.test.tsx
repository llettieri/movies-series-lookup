// @vitest-environment jsdom
import React, { act, Suspense } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, type RenderResult, screen } from '@testing-library/react';
import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { PaginationControls } from '@/components/pagination-controls';

const mockRouter = { push: vi.fn(), replace: vi.fn(), back: vi.fn() };

// Override next/navigation for this file. useSearchParams uses vi.fn() so we can
// change its return value per-test with vi.mocked(useSearchParams).mockReturnValue(...)
vi.mock('next/navigation', () => ({
    useRouter: (): typeof mockRouter => mockRouter,
    useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
    notFound: vi.fn(),
}));

// window.matchMedia is not implemented in jsdom; useIsMobile() calls it.
const mockMatchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(), // legacy fallback
    removeListener: vi.fn(), // legacy fallback
});

beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: mockMatchMedia,
        writable: true,
    });
    // Reset useSearchParams to default (page 1) before each test
    vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams() as ReadonlyURLSearchParams,
    );
});

const renderPagination = async (totalPages: number): Promise<RenderResult> => {
    const promise = Promise.resolve(totalPages);
    let result!: ReturnType<typeof render>;
    await act(async () => {
        result = render(
            <Suspense fallback={null}>
                <PaginationControls totalPagesPromise={promise} />
            </Suspense>,
        );
        // Flush promise microtasks
        await promise;
    });
    return result;
};

describe('PaginationControls', () => {
    it('renders nothing when totalPages is 1', async () => {
        const { container } = await renderPagination(1);
        // Component returns null, so no nav element should be present
        expect(container.querySelector('nav')).toBeNull();
    });

    it('renders previous and next buttons when totalPages > 1', async () => {
        await renderPagination(5);
        expect(
            screen.getByRole('link', { name: /go to previous page/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /go to next page/i }),
        ).toBeInTheDocument();
    });

    it('previous link is aria-disabled on page 1 (default)', async () => {
        await renderPagination(5);
        const prev = screen.getByRole('link', { name: /go to previous page/i });
        expect(prev).toHaveAttribute('aria-disabled', 'true');
    });

    it('next link is aria-disabled on the last page', async () => {
        // Simulate being on page 5 of 5
        vi.mocked(useSearchParams).mockReturnValue(
            new URLSearchParams('page=5') as ReadonlyURLSearchParams,
        );
        await renderPagination(5);
        const next = screen.getByRole('link', { name: /go to next page/i });
        expect(next).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders page number links', async () => {
        await renderPagination(3);
        expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument();
    });
});
