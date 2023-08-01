import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { TVShow } from '@/models/TVShow';
import useSWR from 'swr';

interface UseTVShowsValues {
    popularShows: TVShow[];
    popularIsLoading: boolean;
    airingTodayShows: TVShow[];
    airingTodayIsLoading: boolean;
}

export const useTVShowLists = (): UseTVShowsValues => {
    const { data: popularShows, isLoading: popularIsLoading } = useSWR(
        routes.tv.popular(),
        (url) =>
            api()
                .get<ListDto<TVShow>>(url)
                .then((r) => r.data.results),
        { refreshInterval: 86400 },
    );

    const { data: airingTodayShows, isLoading: airingTodayIsLoading } = useSWR(
        routes.tv.airingToday(),
        (url) =>
            api()
                .get<ListDto<TVShow>>(url)
                .then((r) => r.data.results),
        { refreshInterval: 86400 },
    );

    return {
        popularShows: popularShows ?? [],
        popularIsLoading,
        airingTodayShows: airingTodayShows ?? [],
        airingTodayIsLoading,
    };
};
