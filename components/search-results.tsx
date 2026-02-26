import { ReactNode } from 'react';
import { SearchResult } from '@/models/search-result';
import { ItemList } from '@/components/lists/item-list';
import { PaginateResults } from '@/components/paginate-results';

interface SearchResultsProps {
    resultCallback: () => Promise<SearchResult>;
    query?: string;
}

export const SearchResults = async ({
    resultCallback,
    query = '',
}: SearchResultsProps): Promise<ReactNode> => {
    const result = await resultCallback();

    return (
        <>
            {result.items.length > 0 && (
                <div className="flex flex-col gap-8 pt-2">
                    <ItemList title="Your results" items={result.items} />
                    <PaginateResults pages={result.pages} />
                </div>
            )}
            {result?.total === 0 && query.trim() && (
                <h1 className="text-standard mx-auto my-16 w-64 text-center">
                    No results...
                </h1>
            )}
            <div className="container mx-auto max-w-7xl"></div>
        </>
    );
};
