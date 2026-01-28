import { GenreBadges } from '@/components/genre-badges';
import { CreditsList } from '@/components/lists/credits-list';
import { MediaList } from '@/components/lists/media-list';
import Loading from '@/components/loading';
import { Meta } from '@/components/meta';
import { Rating } from '@/components/rating';
import {
    getMovieCredits,
    getMovieDetails,
    getSimilarMovies,
} from '@/services/movie-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { ReactNode, Suspense } from 'react';
import { TMDBImage } from '@/components/image';
import { SkeletonVerticalList } from '@/components/skeletons/skeleton-vertical-list';

export const generateMetadata = async ({
    params,
}: PageProps<'/movies/[id]'>): Promise<Metadata> => {
    const movieId = (await params).id;
    const { title } = await getMovieDetails(movieId);

    return Meta({
        title: `${title} | Details`,
        keywords: 'movie media streaming details',
    });
};

export default async function MoviePage({
    params,
}: PageProps<'/movies/[id]'>): Promise<ReactNode> {
    const movieId = (await params).id;
    const movie = await getMovieDetails(movieId);
    const credits = await getMovieCredits(movieId);
    const image = movie.backdrop ?? movie.poster;
    const width = movie.backdrop ? 1000 : 500;

    if (!movie) {
        return <Loading />;
    }

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative">
                        <TMDBImage
                            src={image}
                            width={width}
                            height={width / 1.5}
                            className="mx-auto rounded-md"
                            alt="Movie Wallpaper"
                            scope={movie.backdrop ? 'backdrop' : 'poster'}
                            loading="eager"
                        />
                        <Rating value={movie.averageVote} />
                    </div>
                    <GenreBadges genres={movie.genres} />

                    <h1>
                        {movie.homepage ? (
                            <a
                                href={movie.homepage}
                                target="_blank"
                                className="underline"
                                rel="noreferrer"
                            >
                                {movie.title} ({movie.runtime}min)
                            </a>
                        ) : (
                            `${movie.title} (${movie.runtime}min)`
                        )}
                    </h1>
                    {movie.collection ? (
                        <Link
                            href={`/collections/${movie.collection.id}`}
                            prefetch
                        >
                            <h2 className="text-secondary">
                                {movie.collection.name}
                            </h2>
                        </Link>
                    ) : null}
                    <p className="mt-4 text-sm">{movie.overview}</p>
                    <p className="mt-6 text-sm">
                        Release Date:{' '}
                        <span className="text-secondary font-bold">
                            {dayjs(movie.releaseDate).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    {credits.cast.length > 0 && (
                        <CreditsList
                            cast={credits.cast}
                            baseRoute={`/movies/${movieId}`}
                        />
                    )}
                </div>
            </div>
            <div className="pt-2">
                <Suspense
                    fallback={<SkeletonVerticalList title="Similar Movies" />}
                >
                    <MediaList
                        title="Similar Movies"
                        mediaCallback={() => getSimilarMovies(movieId)}
                    />
                </Suspense>
            </div>
        </>
    );
}
