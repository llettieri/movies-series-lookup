import { useMediaLists } from '@/app/api/hooks/useMediaLists';
import { MediaList } from '@/components/lists/MediaList';
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
