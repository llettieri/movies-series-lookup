import { search } from '@/app/search/actions';
import { Hero } from '@/components/Hero';
import { MediaList } from '@/components/lists/MediaList';
import { PeopleList } from '@/components/lists/PeopleList';
import Loading from '@/components/Loading';
import { SearchBar } from '@/components/SearchBar';
import { SearchResult } from '@/models/SearchResult';
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
