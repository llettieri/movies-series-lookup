import { useMovieLists } from '@/app/api/hooks/useMovieLists';
import MediaList from '@/components/lists/MediaList';
import React, { ReactElement } from 'react';
export default function PopularMoviesList(): ReactElement {
    const { popularMovies, popularIsLoading } = useMovieLists();
    return (
        <MediaList
            title="Popular Movies"
            movies={popularMovies}
            isLoading={popularIsLoading}
        />
    );
}
