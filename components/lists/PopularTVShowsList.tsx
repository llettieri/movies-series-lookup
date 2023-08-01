import { useTVShowLists } from '@/app/api/hooks/useTVShowLists';
import MediaList from '@/components/lists/MediaList';
import { ReactElement } from 'react';

export default function PopularTVShowsList(): ReactElement {
    const { popularShows, popularIsLoading } = useTVShowLists();
    return (
        <MediaList
            title="Popular TV Shows"
            shows={popularShows}
            isLoading={popularIsLoading}
        />
    );
}
