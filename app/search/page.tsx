'use client';

import { search } from '@/app/search/actions';
import { Hero } from '@/components/Hero';
import { MediaList } from '@/components/lists/MediaList';
import { PeopleList } from '@/components/lists/PeopleList';
import Loading from '@/components/Loading';
import { SearchBar } from '@/components/SearchBar';
import { updateSearchParams } from '@/hooks/updateSearchParams';
import { EMPTY_SEARCH_RESULT, SearchResult } from '@/models/SearchResult';
import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState, useTransition } from 'react';

export default function SearchPage(): ReactNode {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const [result, setResult] = useState<SearchResult>(EMPTY_SEARCH_RESULT);
    const [isLoading, startSearch] = useTransition();

    const onSearch = debounce((query: string): void => {
        if (query == '') {
            setResult(EMPTY_SEARCH_RESULT);
            updateSearchParams(router, searchParams, ['query', query]);
            return;
        }

        startSearch(async () => {
            setResult(await search(query));
            updateSearchParams(router, searchParams, ['query', query]);
        });
    }, 500);

    useEffect(() => {
        onSearch(query);
    }, []);

    return (
        <>
            <Hero />
            <div className="container mx-auto flex flex-col justify-center">
                <SearchBar
                    defaultValue={query}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            {isLoading ? (
                <Loading />
            ) : (
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
                    {!isLoading && result?.total === 0 && query !== '' && (
                        <h1 className="mx-auto my-16 w-64 text-center text-2xl text-primaryText">
                            No results...
                        </h1>
                    )}
                </>
            )}
        </>
    );
}
