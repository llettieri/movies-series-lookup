/** @vitest-environment jsdom */
import React, { Suspense, act } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/search/search-bar';

const mockRouter = { push: vi.fn(), replace: vi.fn(), back: vi.fn() };

vi.mock('next/navigation', () => ({
    useRouter: (): typeof mockRouter => mockRouter,
    useSearchParams: (): URLSearchParams => new URLSearchParams(),
    notFound: vi.fn(),
}));

const renderSearchBar = async (total = 0): Promise<void> => {
    const resultPromise = Promise.resolve({ items: [], total, pages: 1 });
    await act(async () => {
        render(
            <Suspense fallback={null}>
                <SearchBar resultPromise={resultPromise} />
            </Suspense>,
        );
        // Flush microtasks so the resolved promise propagates
        await resultPromise;
    });
};

describe('SearchBar', () => {
    beforeEach(() => {
        mockRouter.push.mockClear();
    });

    it('renders the search input', async () => {
        await renderSearchBar();
        const input = screen.getByRole('searchbox');
        expect(input).toBeInTheDocument();
    });

    it('does not show result count when total is 0', async () => {
        await renderSearchBar(0);
        expect(screen.queryByText(/results/i)).not.toBeInTheDocument();
    });

    it('shows result count when total is greater than 0', async () => {
        await renderSearchBar(42);
        expect(screen.getByText('42 results')).toBeInTheDocument();
    });

    it('calls router.push with the search query on input change', async () => {
        const user = userEvent.setup();
        await renderSearchBar();
        const input = screen.getByRole('searchbox');
        await user.type(input, 'batman');
        // lodash.debounce delays the call; flush by waiting past the 500ms debounce delay
        await new Promise((r) => setTimeout(r, 600));
        expect(mockRouter.push).toHaveBeenCalledWith(
            expect.stringContaining('query=batman'),
            expect.any(Object),
        );
    });
});
