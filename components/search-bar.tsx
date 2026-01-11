'use client';

import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, ReactNode } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const debouncedSearch = debounce(
    (query: string, router: AppRouterInstance): void =>
        router.push(`?query=${query}`, { scroll: false }),
    500,
);

const SearchBar = (): ReactNode => {
    const router = useRouter();
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
                debouncedSearch(event.target.value, router)
            }
            className="bg-neutral mx-auto mt-16 block w-80 rounded-md border-0 p-2 shadow-md outline-none"
        />
    );
};

export { SearchBar };
