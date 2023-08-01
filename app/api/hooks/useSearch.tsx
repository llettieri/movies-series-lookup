import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { Media } from '@/models/Media';
import useSWR from 'swr';

interface useSearchValues {
    mediaResults: Media[];
    isLoading: boolean;
}

export default function useSearch(query: string): useSearchValues {
    const { data: mediaResults, isLoading } = useSWR(
        routes.search.multi(query),
        (url) => {
            if (query && query !== '') {
                return api()
                    .get<ListDto<Media>>(url)
                    .then((r) => r.data.results);
            }
            return [];
        },
        { keepPreviousData: false },
    );

    return {
        mediaResults: mediaResults ?? [],
        isLoading,
    };
}
