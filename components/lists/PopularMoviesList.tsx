import { useMediaLists } from '@/app/api/hooks/useMediaLists';
import MediaList from '@/components/lists/MediaList';
import React, { ReactElement } from 'react';
export default function PopularMoviesList(): ReactElement {
    const { popularMovies, popularMoviesIsLoading } = useMediaLists();
    return (
        <MediaList
            title="Popular Movies"
            medias={popularMovies}
            isLoading={popularMoviesIsLoading}
        />
    );
}
