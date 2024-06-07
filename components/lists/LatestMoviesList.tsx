import { MediaList } from '@/components/lists/MediaList';
import { useMediaLists } from '@/hooks/useMediaLists';
import { ReactElement } from 'react';

export const LatestMoviesList = (): ReactElement => {
    const { latestMovies, loadingLatestMovies } = useMediaLists();
    return (
        <MediaList
            title="Latest Movies"
            medias={latestMovies}
            isLoading={loadingLatestMovies}
        />
    );
};
