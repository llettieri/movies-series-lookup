import Loading from '@/components/Loading';
import MovieCard from '@/components/MovieCard';
import ShowCard from '@/components/ShowCard';
import { Movie } from '@/models/Movie';
import { TVShow } from '@/models/TVShow';
import React, { ReactElement } from 'react';

interface VideoListProps {
    title: string;
    movies?: Movie[];
    shows?: TVShow[];
    isLoading?: boolean;
}

export default function MediaList({
    title,
    movies,
    shows,
    isLoading,
}: VideoListProps): ReactElement {
    return isLoading ? (
        <Loading />
    ) : (
        <div className="max-w-7xl mx-auto pb-10 px-4">
            <h1 className="text-primaryText text-2xl mt-8 mb-5">{title}</h1>
            <div className="flex flex-row flex-wrap gap-4">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                {shows?.map((show) => <ShowCard key={show.id} show={show} />)}
            </div>
        </div>
    );
}
