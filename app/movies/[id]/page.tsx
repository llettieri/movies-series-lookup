import { GenreBadges } from '@/components/GenreBadges';
import { CreditsList } from '@/components/lists/CreditsList';
import { MediaList } from '@/components/lists/MediaList';
import Loading from '@/components/Loading';
import { Meta } from '@/components/Meta';
import { Rating } from '@/components/Rating';
import {
    getMovieCredits,
    getMovieDetails,
    getSimilarMovies,
} from '@/services/MovieService';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode, Suspense } from 'react';

interface MoviePageProps {
    params: { id: number };
}

export const generateMetadata = async ({
    params,
}: MoviePageProps): Promise<Metadata> => {
    const { title } = await getMovieDetails(params.id);
    return Meta({
        title: `${title} | Details`,
        keywords: 'movie media streaming details',
    });
};

export default async function MoviePage({
    params,
}: MoviePageProps): Promise<ReactNode> {
    const movieId = params.id;
    const movie = await getMovieDetails(movieId);
    const similarMovies = await getSimilarMovies(movieId);
    const credits = await getMovieCredits(movieId);
    const image = movie.backdrop ?? movie.poster ?? '/placeholder.png';
    const width = movie.backdrop ? 1000 : 500;

    if (!movie) {
        return <Loading />;
    }

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <Suspense>
                    <div className="px-3">
                        <div className="relative">
                            <Image
                                src={image}
                                width={width}
                                height={600}
                                className="mx-auto rounded-md"
                                placeholder="blur"
                                blurDataURL="/placeholder.png"
                                loading="lazy"
                                alt="Movie Wallpaper"
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
                            <span className="font-bold text-secondaryText">
                                {dayjs(movie.releaseDate).format(
                                    'MMMM DD, YYYY',
                                )}
                            </span>
                        </p>
                        {credits.cast.length > 0 && (
                            <CreditsList
                                cast={credits.cast}
                                baseRoute={`/movies/${movieId}`}
                            />
                        )}
                    </div>
                </Suspense>
            </div>
            <div className="pt-2">
                {similarMovies.length > 0 ? (
                    <MediaList title="Similar Movies" medias={similarMovies} />
                ) : null}
            </div>
        </>
    );
}
