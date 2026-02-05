import { GenreBadges } from '@/components/genre-badges';
import { CreditsList } from '@/components/lists/credits-list';
import { MediaList } from '@/components/lists/media-list';
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
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    const {
        averageVote,
        backdrop,
        collection,
        genres,
        homepage,
        overview,
        poster,
        releaseDate,
        runtime,
        title,
    } = await getMovieDetails(movieId);
    const credits = await getMovieCredits(movieId);
    const image = backdrop ?? poster;

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative">
                        <AspectRatio ratio={16 / 9}>
                            <TMDBImage
                                id="backdrop"
                                src={image}
                                className="rounded-md object-cover"
                                alt={`${title} backdrop image`}
                                scope={backdrop ? 'backdrop' : 'poster'}
                                fill
                            />
                        </AspectRatio>

                        <Rating value={averageVote} />
                    </div>
                    <GenreBadges genres={genres} />

                    <h1 id="title">
                        {homepage ? (
                            <a
                                href={homepage}
                                target="_blank"
                                className="underline"
                                rel="noreferrer"
                            >
                                {title} ({runtime}min)
                            </a>
                        ) : (
                            `${title} (${runtime}min)`
                        )}
                    </h1>
                    {collection ? (
                        <Link href={`/collections/${collection.id}`} prefetch>
                            <h2 id="collection" className="text-secondary">
                                {collection.name}
                            </h2>
                        </Link>
                    ) : null}
                    <p id="description" className="mt-4 text-sm">
                        {overview}
                    </p>
                    <p id="release-date" className="mt-6 text-sm">
                        Release Date:{' '}
                        <span className="text-secondary font-bold">
                            {dayjs(releaseDate).format('MMMM DD, YYYY')}
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
