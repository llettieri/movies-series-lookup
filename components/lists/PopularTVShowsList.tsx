import { MediaList } from '@/components/lists/MediaList';
import { useMediaLists } from '@/hooks/useMediaLists';
import { ReactElement } from 'react';

export const PopularTVShowsList = (): ReactElement => {
    const { popularShows, loadingPopularShows } = useMediaLists();
    return (
        <MediaList
            title="Popular TV Shows"
            medias={popularShows}
            isLoading={loadingPopularShows}
        />
    );
};
