import { useMovieLists } from '@/app/api/hooks/useMovieLists';
import MediaList from '@/components/lists/MediaList';
import { ReactElement } from 'react';

export default function LatestMoviesList(): ReactElement {
    const { latestMovies, latestIsLoading } = useMovieLists();
    return (
        <MediaList
            title="Latest Movies"
            movies={latestMovies}
            isLoading={latestIsLoading}
        />
    );
}
