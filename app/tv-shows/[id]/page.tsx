import CompanyLogo from '@/components/company-logo';
import { GenreBadges } from '@/components/genre-badges';
import { CreditsCarousel } from '@/components/lists/credits-carousel';
import { Meta } from '@/components/meta';
import { Rating } from '@/components/rating';
import {
    getSimilarTVShows,
    getTVShowDetails,
    getTVShowsCredits,
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
        title,
    } = await getTVShowDetails(showId);
    const credits = await getTVShowsCredits(showId);

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
                    <h2 id="season-info" className="text-secondary">
                        ({seasonsCount} Seasons)
                    </h2>
                    <p id="description" className="mt-4 text-sm">
                        {overview}
                    </p>
                    <p id="release-date" className="mt-4 text-sm">
                        Release Date:{' '}
                        <span className="text-secondary font-bold">
                            {dayjs(releaseDate).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    {lastAirDate ? (
                        <p id="last-aired" className="text-sm">
                            Last Aired:{' '}
                            <span className="text-secondary font-bold">
                                {dayjs(lastAirDate).format('MMMM DD, YYYY')}
                            </span>
                        </p>
                    ) : null}

                    <CreditsCarousel
                        cast={credits.cast}
                        baseRoute={`/tv-shows/${showId}`}
                    />
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
                        <WatchProviders mediaId={showId} type="movie" />
                    </Suspense>
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
