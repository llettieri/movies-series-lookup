import { ReactNode } from 'react';
import { SearchResult } from '@/models/search-result';
import { PeopleList } from '@/components/lists/people-list';
import { MediaList } from '@/components/lists/media-list';

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
            {result.medias.length > 0 && (
                <div className="pt-2">
                    <MediaList title="Media results" medias={result.medias} />
                </div>
            )}
            {result.people.length > 0 && (
                <div className="pt-2">
                    <PeopleList title="Person results" people={result.people} />
                </div>
            )}
            {result?.total === 0 && query.trim() && (
                <h1 className="text-standard mx-auto my-16 w-64 text-center">
                    No results...
                </h1>
            )}
        </>
    );
};
