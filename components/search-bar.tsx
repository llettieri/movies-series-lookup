'use client';

import debounce from 'lodash.debounce';
import { RedirectType, redirect, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, ReactNode } from 'react';

const debouncedSearch = debounce(
    (query: string): void => redirect(`?query=${query}`, RedirectType.push),
    500,
);

const SearchBar = (): ReactNode => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') ?? '';

    return (
        <input
            type="text"
            placeholder="Search..."
            autoFocus={true}
            name="query"
            defaultValue={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                debouncedSearch(event.target.value)
            }
            className="bg-neutral mx-auto mt-16 block w-80 rounded-md border-0 p-2 shadow-md outline-none"
        />
    );
};

export { SearchBar };
