import CompanyLogo from '@/components/company-logo';
import { GenreBadges } from '@/components/genre-badges';
import { ItemCarousel } from '@/components/lists/item-carousel';
import { Meta } from '@/components/meta';
import { Rating } from '@/components/rating';
import {
    getSimilarTVShows,
    getTVShowCredits,
    getTVShowDetails,
} from '@/services/tv-show-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import React, { ReactNode, Suspense } from 'react';
import { TMDBImage } from '@/components/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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
        releaseDate,
        seasonsCount,
        seasons,
        title,
    } = await getTVShowDetails(showId);
    const credits = await getTVShowCredits(showId);

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative">
                        <AspectRatio ratio={16 / 9}>
                            <TMDBImage
                                id="backdrop"
                                src={backdrop}
                                className="rounded-md object-cover"
                                alt={`${title} backdrop image`}
                                scope="backdrop"
                                fill
                                sizes="(min-width: 48rem) 80rem, 18.75rem"
                            />
                        </AspectRatio>
                        <Rating value={Math.round(averageVote)} />
                    </div>
                    <GenreBadges genres={genres} />

                    <h1 id="title">
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
                    <h2 id="seasons-overview" className="text-secondary">
                        ({seasonsCount} Seasons)
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
                    {lastAirDate ? (
                        <p id="last-aired" className="text-md">
                            Last Aired:{' '}
                            <span className="text-secondary text-sm font-bold">
                                {dayjs(lastAirDate).format('MMMM DD, YYYY')}
                            </span>
                        </p>
                    ) : null}

                    <ItemCarousel
                        title="Seasons"
                        items={seasons}
                        link={`${showId}}/seasons`}
                    />
                    <div
                        id="networks"
                        className="flex w-full flex-wrap items-center gap-4"
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
                        <WatchProviders mediaId={showId} type="show" />
                    </Suspense>
                    <ItemCarousel
                        title="Credits"
                        items={credits.cast}
                        link={`${showId}/credits`}
                    />
                </div>
            </div>
            <div className="pt-2">
                <Suspense
                    fallback={
                        <CardVerticalListSkeleton title="Similar Shows" />
                    }
                >
                    <ItemList
                        title="Similar Shows"
                        loadItems={() => getSimilarTVShows(showId)}
                    />
                </Suspense>
            </div>
        </>
    );
}
