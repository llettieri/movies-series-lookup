'use client';

import { useSearch } from '@/app/api/hooks/useSearch';
import { Hero } from '@/components/Hero';
import { MediaList } from '@/components/lists/MediaList';
import { PeopleList } from '@/components/lists/PeopleList';
import Loading from '@/components/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function SearchPage(): ReactNode {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query') ?? '');
    const [debouncedQuery] = useDebounce(query, 1000);
    const { searchResults, totalSearchResults, isLoading } =
        useSearch(debouncedQuery);
    const isQueryValid = !!query && query === debouncedQuery;

    useEffect(() => {
        router.replace(`?query=${query}`);
    }, [query, router]);

    return (
        <>
            <Hero />
            <div className="container mx-auto flex flex-col justify-center">
                <input
                    type="text"
                    onChange={(event): void => setQuery(event.target.value)}
                    defaultValue={query}
                    placeholder="Search..."
                    autoFocus={true}
                    className="form-input mx-auto mt-16 block w-80 rounded-md border-2 border-gray-500 bg-gray-600 p-2 text-primaryText shadow-sm outline-0"
                />
            </div>
            {isLoading ? <Loading /> : null}
            {searchResults.medias.length > 0 ? (
                <div className="pt-2">
                    <MediaList
                        title="Media results"
                        medias={searchResults.medias}
                    />
                </div>
            ) : null}
            {searchResults.people.length > 0 ? (
                <div className="pt-2">
                    <PeopleList
                        title="Person results"
                        people={searchResults.people}
                    />
                </div>
            ) : null}
            {!isLoading && totalSearchResults === 0 && isQueryValid ? (
                <h1 className="mx-auto my-16 w-64 text-center text-2xl text-primaryText">
                    No results...
                </h1>
            ) : null}
        </>
    );
}
