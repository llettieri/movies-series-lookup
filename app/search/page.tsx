'use client';

import useSearch from '@/app/api/hooks/useSearch';
import Hero from '@/components/Hero';
import MediaList from '@/components/lists/MediaList';
import Loading from '@/components/Loading';
import { Movie } from '@/models/Movie';
import { TVShow } from '@/models/TVShow';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function SearchPage(): ReactNode {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query') ?? '');
    const [debouncedQuery] = useDebounce(query, 1000);
    const { mediaResults, isLoading } = useSearch(debouncedQuery);

    useEffect(() => {
        router.replace(`?query=${debouncedQuery}`);
    }, [debouncedQuery, router]);

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
                    className="mx-auto block form-input rounded-md w-80 shadow-sm mt-16 p-2 bg-gray-600 border-gray-500 border-2 text-primaryText outline-0"
                />
            </div>
            {isLoading ? <Loading /> : null}
            {mediaResults.length > 0 ? (
                <div className="pt-2">
                    <MediaList
                        title="Your search results"
                        movies={
                            mediaResults.filter(
                                (m) => m.media_type === 'movie',
                            ) as Movie[]
                        }
                        shows={
                            mediaResults.filter(
                                (m) => m.media_type === 'tv',
                            ) as TVShow[]
                        }
                    />
                </div>
            ) : !isLoading && query && query === debouncedQuery ? (
                <h1 className="text-2xl text-primaryText mx-auto w-64 text-center my-16">
                    No results...
                </h1>
            ) : null}
        </>
    );
}
