'use server';

import { SearchResult } from '@/models/search-result';
import { parseSearchItemDto } from '@/services/parse-service';
import { multiSearch } from '@/services/search-service';

/* eslint-disable camelcase */
export async function search(
    query: string,
    page: number = 1,
): Promise<SearchResult> {
    if (query == '') {
        return {
            items: [],
            total: 0,
            pages: 1,
        };
    }

    const { results, total_pages, total_results } = await multiSearch(
        query,
        page,
    );

    return {
        items: results.map(parseSearchItemDto),
        total: total_results,
        pages: total_pages,
    };
}
