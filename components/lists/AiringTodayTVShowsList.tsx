import { useMediaLists } from '@/app/api/hooks/useMediaLists';
import { MediaList } from '@/components/lists/MediaList';
import { ReactElement } from 'react';

export const AiringTodayTVShowsList = (): ReactElement => {
    const { airingTodayShows, loadingAiringToday } = useMediaLists();

    return (
        <MediaList
            title="Airing Today TV Shows"
            medias={airingTodayShows}
            isLoading={loadingAiringToday}
        />
    );
};
