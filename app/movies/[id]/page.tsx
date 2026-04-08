import { DetailLayout } from '@/components/detail-layout';
import { ItemCarousel } from '@/components/lists/item-carousel';
import { Meta } from '@/components/meta';
import {
    getMovieCredits,
    getMovieDetails,
    getSimilarMovies,
} from '@/services/movie-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { ReactNode, Suspense } from 'react';
import { WatchProviders } from '@/components/watch-providers';
import { WatchProvidersSkeleton } from '@/components/skeletons/watch-providers-skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { ItemList } from '@/components/lists/item-list';

export const generateMetadata = async ({
    params,
}: PageProps<'/movies/[id]'>): Promise<Metadata> => {
    const movieId = (await params).id;
    const { title, type, overview, collection } =
        await getMovieDetails(movieId);

    return Meta({
        title: `${title} | Details`,
        description: overview,
        keywords: [title, type, collection?.name]
            .filter((keyword) => keyword != undefined)
            .join(', '),
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

    const releaseDateRow = releaseDate
        ? {
              label: 'Release Date',
              value: dayjs(releaseDate).format('MMMM DD, YYYY'),
          }
        : null;
    const runtimeRow = runtime
        ? { label: 'Runtime', value: `${runtime} min` }
        : null;

    return (
        <>
            <DetailLayout
                backdrop={backdrop}
                image={poster}
                imageAspect="portrait"
                alt={`${title} poster`}
                title={title}
                subtitle={
                    collection ? (
                        <Link href={`/collections/${collection.id}`} prefetch>
                            {collection.name}
                        </Link>
                    ) : undefined
                }
                rating={averageVote}
                genres={genres}
                homepage={homepage}
                description={overview}
                metadata={[releaseDateRow, runtimeRow]}
            >
                <Suspense fallback={<WatchProvidersSkeleton />}>
                    <WatchProviders mediaId={movieId} type="movie" />
                </Suspense>
                <ItemCarousel
                    title="Credits"
                    items={credits.cast}
                    link={`${movieId}/credits`}
                />
            </DetailLayout>
            <Suspense
                fallback={<CardVerticalListSkeleton title="Similar Movies" />}
            >
                <ItemList
                    title="Similar Movies"
                    loadItems={() => getSimilarMovies(movieId)}
                />
            </Suspense>
        </>
    );
}
