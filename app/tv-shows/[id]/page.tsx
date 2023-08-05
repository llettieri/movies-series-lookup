import { routes } from '@/app/api/config/routes';
import {
    getSimilarTVShows,
    getTVShowDetails,
    getTVShowsCredits,
} from '@/app/api/services/TVShowService';
import MediaList from '@/components/lists/MediaList';
import { Meta } from '@/components/Meta';
import NetworkLogo from '@/components/NetworkLogo';
import PeopleList from '@/components/PeopleList';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface TVShowPageProps {
    params: {
        id: number;
    };
}

export async function generateMetadata({
    params,
}: TVShowPageProps): Promise<Metadata> {
    const show = await getTVShowDetails(params.id);
    return Meta({ title: `${show.title} | Details` });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
            <div className="container max-w-4xl mx-auto py-6">
                <div className="px-3">
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
                    <a
                        href={show.homepage}
                        target="_blank"
                        className="underline text-primary"
                        rel="noreferrer"
                    >
                        <h1 className="font-bold text-primary text-xl my-2">
                            {show.title}
                        </h1>
                    </a>
                    <h2 className="text-secondary font-bold text-md my-2">
                        ({show.seasonsCount} Seasons)
                    </h2>
                    <p className="text-primaryText text-sm mt-4">
                        {show.overview}
                    </p>
                    <p className="text-primaryText text-sm mt-5">
                        Genres:{' '}
                        <span className="font-bold text-secondaryText">
                            {show.genres.map((genre) => genre.name).join(', ')}
                        </span>
                    </p>
                    <p className="text-primaryText text-sm">
                        Release Date:{' '}
                        <span className="font-bold text-secondaryText">
                            {dayjs(show.releaseDate).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    {show.lastAirDate ? (
                        <p className="text-primaryText text-sm">
                            Last Aired:{' '}
                            <span className="font-bold text-secondaryText">
                                {dayjs(show.lastAirDate).format(
                                    'MMMM DD, YYYY',
                                )}
                            </span>
                        </p>
                    ) : null}
                    <p className="text-primaryText text-sm mt-12">
                        Cast: <PeopleList people={credits.cast} />
                    </p>
                    <div className="flex gap-4 mt-5 mx-auto align-middle container">
                        <p className="text-primaryText text-md">
                            Streaming Platforms:{' '}
                        </p>
                        {show.networks.map((network) => (
                            <NetworkLogo key={network.id} network={network} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-2">
                {similarShows.length > 0 ? (
                    <MediaList title="Similar Shows" medias={similarShows} />
                ) : null}
            </div>
        </div>
    );
}
