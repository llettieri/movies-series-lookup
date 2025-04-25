'use server';

import { MultiMediaDto } from '@/models/dto/MultiMediaDto';
import { PersonDto } from '@/models/dto/PersonDto';
import { MediaType } from '@/models/MediaType';
import { SearchResult } from '@/models/SearchResult';
import { parseMultiMediaDto, parsePersonDto } from '@/services/parse-service';
import { multiSearch } from '@/services/search-service';

export async function search(query: string): Promise<SearchResult> {
    if (query == '') {
        return {
            medias: [],
            people: [],
            total: 0,
        };
    }

    const { results } = await multiSearch(query);

    const medias = results.filter(
        (m) => m.media_type !== MediaType.PERSON,
    ) as MultiMediaDto[];
    const people = results.filter(
        (m) => m.media_type === MediaType.PERSON,
    ) as PersonDto[];

    const total = medias.length + people.length;

    return {
        medias: medias.map(parseMultiMediaDto),
        people: people.map(parsePersonDto),
        total,
    };
}
