'use server';

import { routes } from '@/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { MultiMediaDto } from '@/models/dto/MultiMediaDto';
import { PersonDto } from '@/models/dto/PersonDto';
import { MediaType } from '@/models/MediaType';
import { SearchResult } from '@/models/SearchResult';
import { axiosInstance } from '@/services/AxiosService';
import { parseMultiMediaDto, parsePersonDto } from '@/services/ParseService';
import { parseTemplate } from 'url-template';

export async function search(query: string): Promise<SearchResult> {
    const { get } = axiosInstance(process.env.NEXT_PUBLIC_API_KEY);
    const url = parseTemplate(routes.search.multi).expand({ query });

    if (query != '') {
        const response = await get<ListDto<MultiMediaDto | PersonDto>>(url);
        const results = response.data.results;

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

    return {
        medias: [],
        people: [],
        total: 0,
    };
}
