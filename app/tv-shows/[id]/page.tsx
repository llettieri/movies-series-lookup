import CompanyLogo from '@/components/CompanyLogo';
import { GenreBadges } from '@/components/GenreBadges';
import { CreditsList } from '@/components/lists/CreditsList';
import { MediaList } from '@/components/lists/MediaList';
import { Meta } from '@/components/Meta';
import { Rating } from '@/components/Rating';
import { routes } from '@/config/routes';
import { getLocale } from '@/services/session-service';
import {
    getSimilarTVShows,
    getTVShowDetails,
    getTVShowWatchProviders,
    getTVShowsCredits,
} from '@/services/tv-show-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode, Suspense } from 'react';

interface TVShowPageProps {
    params: Promise<{ id: number }>;
}

export const generateMetadata = async ({
    params,
}: TVShowPageProps): Promise<Metadata> => {
    const showId = (await params).id;
    const show = await getTVShowDetails(showId);

    return Meta({
        title: `${show.title} | Details`,
        keywords: 'tv-show media streaming details',
    });
};

export default async function TVShowPage({
    params,
}: TVShowPageProps): Promise<ReactNode> {
    const locale = await getLocale();
    const showId = (await params).id;
    const show = await getTVShowDetails(showId);
    const similarShows = await getSimilarTVShows(showId);
    const credits = await getTVShowsCredits(showId);
    const providerGroup = await getTVShowWatchProviders(showId, locale);
    const image = `${routes.images}${show.backdrop ?? show.poster}`;
    const width = show.backdrop ? 1000 : 500;

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <Suspense>
                        <div className="relative flex justify-center">
                            <Image
                                src={image}
                                width={width}
                                height={600}
                                className="rounded-md"
                                alt="show Wallpaper"
                            />
                            <Rating value={Math.round(show.averageVote)} />
                        </div>
                        <GenreBadges genres={show.genres} />

                        <h1>
                            {show.homepage ? (
                                <a
                                    href={show.homepage}
                                    target="_blank"
                                    className="underline"
                                    rel="noreferrer"
                                >
                                    {show.title}
                                </a>
                            ) : (
                                show.title
                            )}
                        </h1>
                        <h2 className="text-secondary">
                            ({show.seasonsCount} Seasons)
                        </h2>
                        <p className="mt-4 text-sm">{show.overview}</p>
                        <p className="mt-4 text-sm">
                            Release Date:{' '}
                            <span className="text-secondary-text font-bold">
                                {dayjs(show.releaseDate).format(
                                    'MMMM DD, YYYY',
                                )}
                            </span>
                        </p>
                        {show.lastAirDate ? (
                            <p className="text-sm">
                                Last Aired:{' '}
                                <span className="text-secondary-text font-bold">
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
                            <p className="text-md leading-[10]">Networks: </p>
                            {show.networks.map((network) => (
                                <CompanyLogo
                                    key={network.id}
                                    image={network.logo}
                                    alt={network.name}
                                    externalLink={network.homepage}
                                />
                            ))}
                        </div>
                        {providerGroup ? (
                            <div className="container mx-auto">
                                <div className="flex flex-wrap items-center gap-4 align-middle">
                                    <p className="text-md w-auto">
                                        Watch Providers:{' '}
                                    </p>
                                    <div className="flex gap-4">
                                        {providerGroup.providers.map(
                                            (provider) => (
                                                <CompanyLogo
                                                    key={provider.id}
                                                    image={provider.logo}
                                                    alt={provider.name}
                                                    externalLink={
                                                        providerGroup.link
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                                <p className="mt-6 text-sm">
                                    JustWatch makes it easy to find out where
                                    you can legally watch your favorite movies &
                                    TV shows online. Visit{' '}
                                    <span className="underline">
                                        <a
                                            target="_blank"
                                            href="https://www.justwatch.com"
                                        >
                                            JustWatch
                                        </a>
                                    </span>{' '}
                                    for more information.
                                </p>
                            </div>
                        ) : null}
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
        </>
    );
}
