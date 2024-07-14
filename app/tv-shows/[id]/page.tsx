import { GenreTags } from '@/components/GenreTags';
import { CreditsList } from '@/components/lists/CreditsList';
import { MediaList } from '@/components/lists/MediaList';
import { Meta } from '@/components/Meta';
import NetworkLogo from '@/components/NetworkLogo';
import { Rating } from '@/components/Rating';
import { routes } from '@/config/routes';
import {
    getSimilarTVShows,
    getTVShowDetails,
    getTVShowsCredits,
} from '@/services/TVShowService';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode, Suspense } from 'react';

interface TVShowPageProps {
    params: {
        id: number;
    };
}

export const generateMetadata = async ({
    params,
}: TVShowPageProps): Promise<Metadata> => {
    const show = await getTVShowDetails(params.id);
    return Meta({ title: `${show.title} | Details` });
};

export default async function TVShowPage({
    params,
}: TVShowPageProps): Promise<ReactNode> {
    const showId = params.id;
    const show = await getTVShowDetails(showId);
    const similarShows = await getSimilarTVShows(showId);
    const credits = await getTVShowsCredits(showId);
    const image = `${routes.images}${show.backdrop ?? show.poster}`;
    const width = show.backdrop ? 1000 : 500;

    return (
        <div>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <Suspense>
                        <div className="relative flex justify-center">
                            <Image
                                src={image}
                                width={width}
                                height={600}
                                className="rounded-md"
                                placeholder="blur"
                                blurDataURL="/placeholder.png"
                                loading="lazy"
                                alt="show Wallpaper"
                            />
                            <Rating value={Math.round(show.averageVote)} />
                        </div>
                        <GenreTags genres={show.genres} />
                        <a
                            href={show.homepage}
                            target="_blank"
                            className="block w-fit text-primary underline"
                            rel="noreferrer"
                        >
                            <h1 className="mx-0 my-2 w-fit text-xl font-bold text-primary">
                                {show.title}
                            </h1>
                        </a>
                        <h2 className="text-md my-2 font-bold text-secondary">
                            ({show.seasonsCount} Seasons)
                        </h2>
                        <p className="mt-4 text-sm text-primaryText">
                            {show.overview}
                        </p>
                        <p className="mt-4 text-sm text-primaryText">
                            Release Date:{' '}
                            <span className="font-bold text-secondaryText">
                                {dayjs(show.releaseDate).format(
                                    'MMMM DD, YYYY',
                                )}
                            </span>
                        </p>
                        {show.lastAirDate ? (
                            <p className="text-sm text-primaryText">
                                Last Aired:{' '}
                                <span className="font-bold text-secondaryText">
                                    {dayjs(show.lastAirDate).format(
                                        'MMMM DD, YYYY',
                                    )}
                                </span>
                            </p>
                        ) : null}
                        {credits.cast.length > 0 && (
                            <CreditsList
                                cast={credits.cast}
                                baseRoute={`/tv-shows/${showId}`}
                            />
                        )}
                        <div className="container mx-auto flex gap-4 align-middle">
                            <p className="text-md leading-[10] text-primaryText">
                                Streaming Platforms:{' '}
                            </p>
                            {show.networks.map((network) => (
                                <NetworkLogo
                                    key={network.id}
                                    network={network}
                                />
                            ))}
                        </div>
                    </Suspense>
                </div>
            </div>
            {similarShows.length > 0 && (
                <Suspense>
                    <div className="pt-2">
                        <MediaList
                            title="Similar Shows"
                            medias={similarShows}
                        />
                    </div>
                </Suspense>
            )}
        </div>
    );
}
