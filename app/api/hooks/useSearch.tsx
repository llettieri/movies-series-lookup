import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { parsePersonDto } from '@/app/api/services/PersonService';
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

export default function useSearch(query: string): useSearchValues {
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
}

function parseMultiMediaDto(m: MultiMediaDto): Media {
    const type = m.media_type as MediaType;
    return {
        id: m.id,
        title: m.title ?? m.name ?? '',
        backdrop: m.backdrop_path
            ? `${routes.images}${m.backdrop_path}`
            : undefined,
        releaseDate: m.release_date,
        mediaType: type,
        poster: m.poster_path ? `${routes.images}${m.poster_path}` : undefined,
        overview: m.overview,
        runtime: undefined,
        collection: undefined,
        genres: [],
        homepage: '',
    };
}
