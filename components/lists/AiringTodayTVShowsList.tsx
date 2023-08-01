import { useTVShowLists } from '@/app/api/hooks/useTVShowLists';
import MediaList from '@/components/lists/MediaList';
import { ReactElement } from 'react';

export default function AiringTodayTVShowsList(): ReactElement {
    const { airingTodayShows, airingTodayIsLoading } = useTVShowLists();

    return (
        <MediaList
            title="Airing Today TV Shows"
            shows={airingTodayShows}
            isLoading={airingTodayIsLoading}
        />
    );
}
