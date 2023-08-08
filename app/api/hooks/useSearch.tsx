import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import {
    parseMultiMediaDto,
    parsePersonDto,
} from '@/app/api/services/ParseService';
import { ListDto } from '@/models/dto/ListDto';
import { MultiMediaDto } from '@/models/dto/MultiMediaDto';
import { PersonDto } from '@/models/dto/PersonDto';
import { Media } from '@/models/Media';
import { MediaType } from '@/models/MediaType';
import { Person } from '@/models/Person';
import useSWR from 'swr';
import { parseTemplate } from 'url-template';

interface useSearchValues {
    searchResults: SearchResults;
    totalSearchResults: number;
    isLoading: boolean;
}

interface SearchResults {
    medias: Media[];
    people: Person[];
}

export const useSearch = (query: string): useSearchValues => {
    const { data: searchResults, isLoading } = useSWR<SearchResults>(
        parseTemplate(routes.search.multi).expand({ query }),
        (url) => {
            if (query && query !== '') {
                return api()
                    .get<ListDto<MultiMediaDto | PersonDto>>(url)
                    .then((r) => {
                        const medias = r.data.results.filter(
                            (m) => m.media_type !== MediaType.PERSON,
                        ) as MultiMediaDto[];
                        const people = r.data.results.filter(
                            (m) => m.media_type === MediaType.PERSON,
                        ) as PersonDto[];

                        return {
                            medias: medias.map(parseMultiMediaDto),
                            people: people.map(parsePersonDto),
                        };
                    });
            }
            return {
                medias: [],
                people: [],
            };
        },
        { keepPreviousData: false },
    );

    return {
        searchResults: searchResults ?? { people: [], medias: [] },
        totalSearchResults:
            (searchResults?.medias.length ?? 0) +
            (searchResults?.people.length ?? 0),
        isLoading,
    };
};
