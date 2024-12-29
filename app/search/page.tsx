'use client';

import { search } from '@/app/search/actions';
import { Hero } from '@/components/Hero';
import { MediaList } from '@/components/lists/MediaList';
import { PeopleList } from '@/components/lists/PeopleList';
import Loading from '@/components/Loading';
import { SearchBar } from '@/components/SearchBar';
import { EMPTY_SEARCH_RESULT, SearchResult } from '@/models/SearchResult';
import { updateSearchParams } from '@/utils/updateSearchParams';
import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {
    ReactNode,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from 'react';

export default function SearchPage(): ReactNode {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const [result, setResult] = useState<SearchResult>(EMPTY_SEARCH_RESULT);
    const [isLoading, startSearch] = useTransition();

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string): void => {
                setResult(EMPTY_SEARCH_RESULT);

                if (query.trim() == '') {
                    updateSearchParams(router, searchParams, ['query', query]);
                    return;
                }

                startSearch(async () => {
                    try {
                        const searchResult = await search(query);
                        setResult(searchResult);

                        if (searchParams.get('query') !== query) {
                            updateSearchParams(router, searchParams, [
                                'query',
                                query,
                            ]);
                        }
                    } catch (error: unknown) {
                        // eslint-disable-next-line no-console
                        console.error(
                            `Search request with query ${query} failed because of: ${error}`,
                        );
                    }
                });
            }, 500),
        [router, searchParams],
    );

    useEffect(() => {
        debouncedSearch(query);

        return (): void => debouncedSearch.cancel();
    }, [debouncedSearch, query]);

    return (
        <>
            <Hero />
            <div className="container mx-auto flex flex-col justify-center">
                <SearchBar
                    defaultValue={query}
                    onChange={(e) => debouncedSearch(e.target.value)}
                />
            </div>
            {isLoading && query.trim() !== '' ? (
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
                        <h1 className="mx-auto my-16 w-64 text-center text-standard">
                            No results...
                        </h1>
                    )}
                </>
            )}
        </>
    );
}
