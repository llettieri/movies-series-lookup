import { routes } from '@/config/routes';
import { useAxios } from '@/hooks/useAxios';
import { ListDto } from '@/models/dto/ListDto';
import { MultiMediaDto } from '@/models/dto/MultiMediaDto';
import { PersonDto } from '@/models/dto/PersonDto';
import { Media } from '@/models/Media';
import { MediaType } from '@/models/MediaType';
import { Person } from '@/models/Person';
import { parseMultiMediaDto, parsePersonDto } from '@/services/ParseService';
import { useQuery } from '@tanstack/react-query';
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
    const axios = useAxios(process.env.NEXT_PUBLIC_API_KEY);

    const { data: searchResults, isLoading } = useQuery<SearchResults>({
        queryKey: ['search', query],
        queryFn: () => {
            if (query && query !== '') {
                return axios
                    .get<ListDto<MultiMediaDto | PersonDto>>(
                        parseTemplate(routes.search.multi).expand({
                            query,
                        }),
                    )
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
        initialData: { people: [], medias: [] },
    });

    return {
        searchResults,
        totalSearchResults:
            (searchResults?.medias.length ?? 0) +
            (searchResults?.people.length ?? 0),
        isLoading,
    };
};
