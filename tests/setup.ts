import React from 'react';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from './msw/server';

// MSW lifecycle — covers all service tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// next/image mock — needed for component tests (RTL can't satisfy Next.js image internals)
// AND parser tests (parse-service.ts imports FALLBACK_IMAGE from @/components/image,
// which is 'use client' and imports next/image).
vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }): React.ReactElement =>
        React.createElement('img', { src, alt }),
}));

const mockRouter = { push: vi.fn(), replace: vi.fn(), back: vi.fn() };

// next/navigation mock — two concerns:
// (a) component tests (jsdom): hooks throw outside App Router context
// (b) service tests (node): api.ts interceptor calls notFound() on HTTP 404 only;
//     other 4xx errors reject the promise without calling notFound().
vi.mock('next/navigation', () => ({
    useRouter: (): typeof mockRouter => mockRouter,
    usePathname: (): string => '/',
    useSearchParams: (): URLSearchParams => new URLSearchParams(),
    notFound: vi.fn(),
}));
