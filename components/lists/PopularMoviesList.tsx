import { useMediaLists } from '@/app/api/hooks/useMediaLists';
import { MediaList } from '@/components/lists/MediaList';
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
