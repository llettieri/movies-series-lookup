import { CompanyLogo } from '@/components/company-logo';
import { DetailLayout } from '@/components/detail-layout';
import { ItemCarousel } from '@/components/lists/item-carousel';
import { Meta } from '@/components/meta';
import {
    getTVShowDetails,
    getTVShowSeasonCredits,
    getTVShowSeasonDetails,
} from '@/services/tv-show-service';
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

    const firstAiredRow = releaseDate
        ? {
              label: 'First Aired',
              value: dayjs(releaseDate).format('MMMM DD, YYYY'),
          }
        : null;
    return (
        <>
            <DetailLayout
                backdrop={null}
                image={poster}
                imageAspect="portrait"
                alt={`${title} poster`}
                title={
                    <>
                        <Link
                            href={`/tv-shows/${showId}`}
                            className="underline"
                        >
                            {showTitle}
                        </Link>
                        {': '}
                        {title}
                    </>
                }
                subtitle={`${episodeCount} Episode${episodeCount !== 1 ? 's' : ''}`}
                rating={averageVote}
                description={overview}
                metadata={[firstAiredRow]}
            >
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
            </DetailLayout>
            <Suspense fallback={<CardVerticalListSkeleton title="Episodes" />}>
                <ItemList title="Episodes" items={episodes} />
            </Suspense>
        </>
    );
}
