'use client';

import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, ReactNode } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Search } from 'lucide-react';
import { SearchResult } from '@/models/search-result';

interface SearchBarProps {
    result: SearchResult;
}

const debouncedSearch = debounce(
    (query: string, router: AppRouterInstance): void =>
        router.push(`?query=${query}`, { scroll: false }),
    500,
);

const SearchBar = ({ result }: SearchBarProps): ReactNode => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const { total } = result;

    return (
        <InputGroup className="mx-auto w-80">
            <InputGroupInput
                name="query"
                type="search"
                autoFocus={true}
                placeholder="Search..."
                defaultValue={query}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                    debouncedSearch(event.target.value, router)
                }
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            {total > 0 && (
                <InputGroupAddon align="inline-end">
                    {total} results
                </InputGroupAddon>
            )}
        </InputGroup>
    );
};

export { SearchBar };
