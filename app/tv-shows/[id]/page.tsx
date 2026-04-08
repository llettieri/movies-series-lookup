import { CompanyLogo } from '@/components/company-logo';
import { DetailLayout } from '@/components/detail-layout';
import { ItemCarousel } from '@/components/lists/item-carousel';
import { Meta } from '@/components/meta';
import {
    getSimilarTVShows,
    getTVShowCredits,
    getTVShowDetails,
} from '@/services/tv-show-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import React, { ReactNode, Suspense } from 'react';
import { WatchProviders } from '@/components/watch-providers';
import { WatchProvidersSkeleton } from '@/components/skeletons/watch-providers-skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { ItemList } from '@/components/lists/item-list';

export const generateMetadata = async ({
    params,
}: PageProps<'/tv-shows/[id]'>): Promise<Metadata> => {
    const showId = (await params).id;
    const { title, type, overview, collection } =
        await getTVShowDetails(showId);

    return Meta({
        title: `${title} | Details`,
        description: overview,
        keywords: [title, type, collection?.name]
            .filter((keyword) => keyword != undefined)
            .join(', '),
    });
};

export default async function TVShowPage({
    params,
}: PageProps<'/tv-shows/[id]'>): Promise<ReactNode> {
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
        seasons,
        title,
    } = await getTVShowDetails(showId);
    const credits = await getTVShowCredits(showId);

    const firstAiredRow = releaseDate
        ? {
              label: 'First Aired',
              value: dayjs(releaseDate).format('MMMM DD, YYYY'),
          }
        : null;
    const lastAiredRow = releaseDate
        ? {
              label: 'Last Aired',
              value: dayjs(lastAirDate).format('MMMM DD, YYYY'),
          }
        : null;

    return (
        <>
            <DetailLayout
                backdrop={backdrop}
                image={poster}
                imageAspect="portrait"
                alt={`${title} poster`}
                title={title}
                subtitle={`${seasonsCount} Season${seasonsCount !== 1 ? 's' : ''}`}
                rating={averageVote}
                genres={genres}
                homepage={homepage}
                description={overview}
                metadata={[firstAiredRow, lastAiredRow]}
            >
                <ItemCarousel
                    title="Seasons"
                    items={seasons}
                    link={`${showId}/seasons`}
                />
                <div
                    id="networks"
                    className="flex w-full flex-wrap items-center gap-4"
                >
                    <p className="text-md w-auto">Networks: </p>
                    {networks.map(
                        ({ homepage: networkHomepage, id, logo, name }) => (
                            <CompanyLogo
                                key={id}
                                image={logo}
                                alt={name}
                                externalLink={networkHomepage}
                            />
                        ),
                    )}
                </div>
                <Suspense fallback={<WatchProvidersSkeleton />}>
                    <WatchProviders mediaId={showId} type="show" />
                </Suspense>
                <ItemCarousel
                    title="Credits"
                    items={credits.cast}
                    link={`${showId}/credits`}
                />
            </DetailLayout>
            <Suspense
                fallback={<CardVerticalListSkeleton title="Similar Shows" />}
            >
                <ItemList
                    title="Similar Shows"
                    loadItems={() => getSimilarTVShows(showId)}
                />
            </Suspense>
        </>
    );
}
