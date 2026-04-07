import { Meta } from '@/components/meta';
import {
    getTVShowDetails,
    getTVShowSeasonEpisodeCredits,
    getTVShowSeasonEpisodeDetails,
} from '@/services/tv-show-service';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { TMDBImage } from '@/components/image';
import { Rating } from '@/components/rating';
import dayjs from 'dayjs';
import { ItemCarousel } from '@/components/lists/item-carousel';
import Link from 'next/link';

export const generateMetadata = async ({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]/episodes/[episodeNumber]'>): Promise<Metadata> => {
    const showId = (await params).id;
    const seasonNumber = Number((await params).seasonNumber);
    const episodeNumber = Number((await params).episodeNumber);

    const { title, type, overview } = await getTVShowSeasonEpisodeDetails(
        showId,
        seasonNumber,
        episodeNumber,
    );
    const { title: showTitle, overview: showOverview } =
        await getTVShowDetails(showId);

    return Meta({
        title: `${showTitle} | S${seasonNumber}:E${episodeNumber} | Details`,
        description: overview || showOverview,
        keywords: [showTitle, title, type]
            .filter((keyword) => keyword != undefined)
            .join(', '),
    });
};

export default async function TVShowSeasonPage({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]/episodes/[episodeNumber]'>): Promise<ReactNode> {
    const showId = (await params).id;
    const seasonNumber = Number((await params).seasonNumber);
    const episodeNumber = Number((await params).episodeNumber);
    const { title, backdrop, averageVote, overview, releaseDate, runtime } =
        await getTVShowSeasonEpisodeDetails(
            showId,
            seasonNumber,
            episodeNumber,
        );
    const credits = await getTVShowSeasonEpisodeCredits(
        showId,
        seasonNumber,
        episodeNumber,
    );

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative mb-4">
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
                    <h1 id="title">
                        <Link
                            href={`/tv-shows/${showId}/seasons/${seasonNumber}`}
                        >
                            S{seasonNumber}
                        </Link>
                        :E{episodeNumber} {title}
                    </h1>
                    <h2 id="episodes-overview" className="text-secondary">
                        ({runtime} min)
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
                    <ItemCarousel
                        title="Credits"
                        items={credits.cast}
                        link={`${episodeNumber}/credits`}
                    />
                </div>
            </div>
        </>
    );
}
