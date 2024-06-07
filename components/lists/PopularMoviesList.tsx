import { MediaList } from '@/components/lists/MediaList';
import { useMediaLists } from '@/hooks/useMediaLists';
import React, { ReactElement } from 'react';

export const PopularMoviesList = (): ReactElement => {
    const { popularMovies, loadingPopularMovies } = useMediaLists();
    return (
        <MediaList
            title="Popular Movies"
            medias={popularMovies}
            isLoading={loadingPopularMovies}
        />
    );
};
