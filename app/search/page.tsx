import { search } from '@/app/search/actions';
import { Hero } from '@/components/hero';
import { MediaList } from '@/components/lists/media-list';
import { PeopleList } from '@/components/lists/people-list';
import Loading from '@/components/loading';
import { SearchBar } from '@/components/search-bar';
import { SearchResult } from '@/models/search-result';
import React, { ReactNode, Suspense } from 'react';

interface SearchPageProps {
    searchParams: Promise<{ query: string | undefined }>;
}

export default async function SearchPage({
    searchParams,
}: SearchPageProps): Promise<ReactNode> {
    const { query } = await searchParams;

    let result: SearchResult | undefined = undefined;

    if (query && query.trim()) {
        result = await search(query);
    }

    return (
        <>
            <Hero />
            <SearchBar />
            <Suspense fallback={<Loading />}>
                {result && (
                    <>
                        {result.medias.length > 0 && (
                            <div className="pt-2">
                                <MediaList
                                    title="Media results"
                                    medias={result.medias}
                                />
                            </div>
                        )}
                        {result.people.length > 0 && (
                            <div className="pt-2">
                                <PeopleList
                                    title="Person results"
                                    people={result.people}
                                />
                            </div>
                        )}
                        {result?.total === 0 && query !== '' && (
                            <h1 className="text-standard mx-auto my-16 w-64 text-center">
                                No results...
                            </h1>
                        )}
                    </>
                )}
            </Suspense>
        </>
    );
}
