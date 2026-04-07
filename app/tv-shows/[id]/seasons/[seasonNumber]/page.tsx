import { Meta } from '@/components/meta';
import {
    getTVShowDetails,
    getTVShowSeasonCredits,
    getTVShowSeasonDetails,
} from '@/services/tv-show-service';
import { Metadata } from 'next';
import React, { ReactNode, Suspense } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { TMDBImage } from '@/components/image';
import { Rating } from '@/components/rating';
import dayjs from 'dayjs';
import CompanyLogo from '@/components/company-logo';
import { WatchProvidersSkeleton } from '@/components/skeletons/watch-providers-skeleton';
import { WatchProviders } from '@/components/watch-providers';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { ItemList } from '@/components/lists/item-list';
import Link from 'next/link';
import { ItemCarousel } from '@/components/lists/item-carousel';

export const generateMetadata = async ({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]'>): Promise<Metadata> => {
    const showId = (await params).id;
    const seasonNumber = Number((await params).seasonNumber);

    const { title, type, overview } = await getTVShowSeasonDetails(
        showId,
        seasonNumber,
    );
    const { title: showTitle, overview: showOverview } =
        await getTVShowDetails(showId);

    return Meta({
        title: `${showTitle} | S${seasonNumber} | Details`,
        description: overview || showOverview,
        keywords: [showTitle, title, type]
            .filter((keyword) => keyword != undefined)
            .join(', '),
    });
};

export default async function TVShowSeasonPage({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]'>): Promise<ReactNode> {
    const showId = (await params).id;
    const seasonNumber = Number((await params).seasonNumber);
    const { title: showTitle } = await getTVShowDetails(showId);
    const {
        title,
        poster,
        averageVote,
        episodeCount,
        overview,
        releaseDate,
        networks,
        episodes,
    } = await getTVShowSeasonDetails(showId, seasonNumber);
    const credits = await getTVShowSeasonCredits(showId, seasonNumber);

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative mx-auto mb-4 block max-w-70 md:max-w-sm">
                        <AspectRatio ratio={2 / 3}>
                            <TMDBImage
                                id="poster"
                                src={poster}
                                className="rounded-md object-cover"
                                alt={`${title} poster image`}
                                scope="poster"
                                fill
                                sizes="(min-width: 64rem) 80rem, (min-width: 48rem) 31.25rem, 18.75rem"
                            />
                        </AspectRatio>
                        <Rating value={Math.round(averageVote)} />
                    </div>
                    <h1 id="title">
                        <Link
                            href={`/tv-shows/${showId}`}
                            className="underline"
                        >
                            {showTitle}
                        </Link>
                        : {title}
                    </h1>
                    <h2 id="episodes-overview" className="text-secondary">
                        ({episodeCount} Episodes)
                    </h2>
                    <p id="description" className="mt-4 text-sm">
                        {overview}
                    </p>
                    <p id="release-date" className="text-md mt-4">
                        Release Date:{' '}
                        <span className="text-secondary text-sm font-bold">
                            {dayjs(releaseDate).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    <div
                        id="networks"
                        className="mt-8 flex w-full flex-wrap items-center gap-4"
                    >
                        <p className="text-md w-auto">Networks: </p>
                        {networks.map(({ homepage, id, logo, name }) => (
                            <CompanyLogo
                                key={id}
                                image={logo}
                                alt={name}
                                externalLink={homepage}
                            />
                        ))}
                    </div>
                    <Suspense fallback={<WatchProvidersSkeleton />}>
                        <WatchProviders
                            mediaId={showId}
                            seasonNumber={seasonNumber}
                            type="showSeason"
                        />
                    </Suspense>
                    <ItemCarousel
                        title="Credits"
                        items={credits.cast}
                        link={`${seasonNumber}/credits`}
                    />
                </div>
            </div>
            <div className="pt-2">
                <Suspense
                    fallback={<CardVerticalListSkeleton title="Episodes" />}
                >
                    <ItemList title="Episodes" items={episodes} />
                </Suspense>
            </div>
        </>
    );
}
