import { search } from '@/app/search/actions';
import { Hero } from '@/components/hero';
import { MediaList } from '@/components/lists/media-list';
import { PeopleList } from '@/components/lists/people-list';
import { SearchBar } from '@/components/search-bar';
import { SearchResult } from '@/models/search-result';
import React, { ReactNode, Suspense } from 'react';
import { SkeletonList } from '@/components/skeletons/skeleton-list';

type SearchParams = { query: string | undefined };

export default async function SearchPage({
    searchParams,
}: PageProps<'/search'>): Promise<ReactNode> {
    const { query } = (await searchParams) as SearchParams;
    const isQueryEmpty = query === undefined || query.trim() === '';

    let result: Promise<SearchResult> | null = null;
    let total = 0;

    if (!isQueryEmpty) {
        result = search(query);
        total = (await result).total;
    }

    return (
        <>
            <Hero />
            <SearchBar totalResults={total} />

            {isQueryEmpty || result == null ? (
                <></>
            ) : (
                <Suspense fallback={<SkeletonList title="Results" />}>
                    <>
                        <div className="pt-2">
                            <MediaList
                                title="Media results"
                                mediaCallback={async () =>
                                    (await result).medias
                                }
                            />
                        </div>
                        <div className="pt-2">
                            <PeopleList
                                title="Person results"
                                peopleCallback={async () =>
                                    (await result).people
                                }
                            />
                        </div>
                    </>
                </Suspense>
            )}
            {!total && query !== '' && (
                <h1 className="text-foreground mx-auto my-16 w-64 text-center">
                    No results...
                </h1>
            )}
        </>
    );
}
