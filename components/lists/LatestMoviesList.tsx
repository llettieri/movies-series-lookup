import { useMediaLists } from '@/app/api/hooks/useMediaLists';
import { MediaList } from '@/components/lists/MediaList';
import { ReactElement } from 'react';

export const LatestMoviesList = (): ReactElement => {
    const { latestMovies, latestIsLoading } = useMediaLists();
    return (
        <MediaList
            title="Latest Movies"
            medias={latestMovies}
            isLoading={latestIsLoading}
        />
    );
};
