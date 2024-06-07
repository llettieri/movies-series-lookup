import { MediaList } from '@/components/lists/MediaList';
import { useMediaLists } from '@/hooks/useMediaLists';
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
