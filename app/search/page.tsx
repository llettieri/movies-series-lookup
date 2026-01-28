import { search } from '@/app/search/actions';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { EMPTY_SEARCH_RESULT, SearchResult } from '@/models/search-result';
import React, { ReactNode, Suspense } from 'react';
import { SearchResults } from '@/components/search-results';
import { SkeletonVerticalList } from '@/components/skeletons/skeleton-vertical-list';

type SearchParams = { query: string | undefined };

export default async function SearchPage({
    searchParams,
}: PageProps<'/search'>): Promise<ReactNode> {
    const { query } = (await searchParams) as SearchParams;

    const searchCallback = (): Promise<SearchResult> => {
        if (query?.trim()) {
            return search(query);
        }

        return new Promise<SearchResult>((resolve) =>
            resolve(EMPTY_SEARCH_RESULT),
        );
    };

    return (
        <>
            <Hero />
            <SearchBar result={await searchCallback()} />
            <Suspense fallback={<SkeletonVerticalList title="Media results" />}>
                <SearchResults resultCallback={searchCallback} query={query} />
            </Suspense>
        </>
    );
}
