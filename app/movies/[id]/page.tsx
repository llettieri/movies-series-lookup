import { routes } from '@/app/api/config/routes';
import {
    getMovieCredits,
    getMovieDetails,
    getSimilarMovies,
} from '@/app/api/services/MovieService';
import MediaList from '@/components/lists/MediaList';
import Loading from '@/components/Loading';
import { Meta } from '@/components/Meta';
import PeopleList from '@/components/PeopleList';
import { Genre } from '@/models/Genre';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface MoviePageProps {
    params: { id: number };
}

export async function generateMetadata({
    params,
}: MoviePageProps): Promise<Metadata> {
    const movie = await getMovieDetails(params.id);
    return Meta({ title: `${movie.title} | Details` });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function MoviePage({
    params,
}: MoviePageProps): Promise<ReactNode> {
    const movieId = params.id;
    const movie = await getMovieDetails(movieId);
    const similarMovies = await getSimilarMovies(movieId);
    const credits = await getMovieCredits(movieId);
    const image = `${routes.images}${movie.backdrop ?? movie.poster}`;
    const width = movie.backdrop ? 1000 : 500;

    if (!movie) {
        return <Loading />;
    }

    return (
        <div>
            <div className="container max-w-4xl mx-auto py-6">
                <div className="px-3">
                    <Image
                        src={image}
                        width={width}
                        height={600}
                        className="rounded-md mx-auto"
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                        loading="lazy"
                        alt="Movie Wallpaper"
                    />
                    <a
                        href={movie.homepage}
                        target="_blank"
                        className="underline text-primary"
                        rel="noreferrer"
                    >
                        <h1 className="font-bold text-primary text-xl my-2">
                            {movie.title} ({movie.runtime}min)
                        </h1>
                    </a>
                    {movie.collection ? (
                        <Link href={`/collections/${movie.collection.id}`}>
                            <h2 className="text-secondary font-bold text-md my-2">
                                {movie.collection.name}
                            </h2>
                        </Link>
                    ) : (
                        ''
                    )}
                    <p className="text-primaryText text-sm mt-4">
                        {movie.overview}
                    </p>
                    <p className="text-primaryText text-sm mt-5">
                        Genres:{' '}
                        <span className="font-bold text-secondaryText">
                            {movie.genres
                                .map((genre: Genre) => genre.name)
                                .join(', ')}
                        </span>
                    </p>
                    <p className="text-primaryText text-sm">
                        Release Date:{' '}
                        <span className="font-bold text-secondaryText">
                            {dayjs(movie.releaseDate).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    {
                        <p className="text-primaryText text-sm mt-12">
                            Cast: <PeopleList people={credits.cast} />
                        </p>
                    }
                </div>
            </div>
            <div className="pt-2">
                {similarMovies.length > 0 ? (
                    <MediaList title="Similar Movies" medias={similarMovies} />
                ) : null}
            </div>
        </div>
    );
}
