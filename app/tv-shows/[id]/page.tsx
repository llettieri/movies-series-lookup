import CompanyLogo from '@/components/company-logo';
import { GenreBadges } from '@/components/genre-badges';
import { CreditsList } from '@/components/lists/credits-list';
import { MediaList } from '@/components/lists/media-list';
import { Meta } from '@/components/meta';
import { Rating } from '@/components/rating';
import { getLocale } from '@/services/session-service';
import {
    getSimilarTVShows,
    getTVShowDetails,
    getTVShowsCredits,
    getTVShowWatchProviders,
} from '@/services/tv-show-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import React, { ReactNode, Suspense } from 'react';
import { TMDBImage } from '@/components/image';

export const generateMetadata = async ({
    params,
}: PageProps<'/tv-shows/[id]'>): Promise<Metadata> => {
    const showId = (await params).id;
    const show = await getTVShowDetails(showId);

    return Meta({
        title: `${show.title} | Details`,
        keywords: 'tv-show media streaming details',
    });
};

export default async function TVShowPage({
    params,
}: PageProps<'/tv-shows/[id]'>): Promise<ReactNode> {
    const locale = await getLocale();
    const showId = (await params).id;
    const {
        averageVote,
        backdrop,
        genres,
        homepage,
        lastAirDate,
        networks,
        overview,
        poster,
        releaseDate,
        seasonsCount,
        title,
    } = await getTVShowDetails(showId);
    const similarShowsPromise = getSimilarTVShows(showId);
    const credits = await getTVShowsCredits(showId);
    const providerGroup = await getTVShowWatchProviders(showId, locale);
    const image = backdrop ?? poster;
    const width = backdrop ? 1000 : 500;

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <Suspense>
                        <div className="relative flex justify-center">
                            <TMDBImage
                                src={image}
                                width={width}
                                height={600}
                                className="rounded-md"
                                alt="show Wallpaper"
                                scope={backdrop ? 'backdrop' : 'poster'}
                                loading="eager"
                            />
                            <Rating value={Math.round(averageVote)} />
                        </div>
                        <GenreBadges genres={genres} />

                        <h1>
                            {homepage ? (
                                <a
                                    href={homepage}
                                    target="_blank"
                                    className="underline"
                                    rel="noreferrer"
                                >
                                    {title}
                                </a>
                            ) : (
                                title
                            )}
                        </h1>
                        <h2 className="text-secondary">
                            ({seasonsCount} Seasons)
                        </h2>
                        <p className="mt-4 text-sm">{overview}</p>
                        <p className="mt-4 text-sm">
                            Release Date:{' '}
                            <span className="text-secondary-text font-bold">
                                {dayjs(releaseDate).format('MMMM DD, YYYY')}
                            </span>
                        </p>
                        {lastAirDate ? (
                            <p className="text-sm">
                                Last Aired:{' '}
                                <span className="text-secondary-text font-bold">
                                    {dayjs(lastAirDate).format('MMMM DD, YYYY')}
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
                            {networks.map(({ homepage, id, logo, name }) => (
                                <CompanyLogo
                                    key={id}
                                    image={logo}
                                    alt={name}
                                    externalLink={homepage}
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
                                            ({ id, logo, name }) => (
                                                <CompanyLogo
                                                    key={id}
                                                    image={logo}
                                                    alt={name}
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
            <Suspense>
                <div className="pt-2">
                    <MediaList
                        title="Similar Shows"
                        mediaCallback={() => similarShowsPromise}
                    />
                </div>
            </Suspense>
        </>
    );
}
