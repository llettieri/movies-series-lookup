import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { MultiMediaDto } from '@/models/dto/MultiMediaDto';
import { Media } from '@/models/Media';
import { MediaType } from '@/models/MediaType';
import useSWR from 'swr';

interface useSearchValues {
    searchResults: Media[];
    isLoading: boolean;
}

export default function useSearch(query: string): useSearchValues {
    const { data: searchResults, isLoading } = useSWR(
        routes.search.multi(query),
        (url) => {
            if (query && query !== '') {
                return api()
                    .get<ListDto<MultiMediaDto>>(url)
                    .then((r) =>
                        r.data.results
                            .map(parseMultiMediaDto)
                            .filter((m) => m.mediaType !== MediaType.PERSON),
                    );
            }
            return [];
        },
        { keepPreviousData: false },
    );

    return {
        searchResults: searchResults ?? [],
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
