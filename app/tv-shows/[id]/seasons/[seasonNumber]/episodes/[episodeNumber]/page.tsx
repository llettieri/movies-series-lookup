import { DetailLayout } from '@/components/detail-layout';
import { ItemCarousel } from '@/components/lists/item-carousel';
import { Meta } from '@/components/meta';
import {
    getTVShowDetails,
    getTVShowSeasonEpisodeCredits,
    getTVShowSeasonEpisodeDetails,
} from '@/services/tv-show-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { ReactNode } from 'react';

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

export default async function TVShowSeasonEpisodePage({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]/episodes/[episodeNumber]'>): Promise<ReactNode> {
    const showId = (await params).id;
    const seasonNumber = Number((await params).seasonNumber);
    const episodeNumber = Number((await params).episodeNumber);
    const {
        title,
        backdrop,
        poster,
        averageVote,
        overview,
        releaseDate,
        runtime,
    } = await getTVShowSeasonEpisodeDetails(
        showId,
        seasonNumber,
        episodeNumber,
    );
    const credits = await getTVShowSeasonEpisodeCredits(
        showId,
        seasonNumber,
        episodeNumber,
    );

    const firstAiredRow = releaseDate
        ? {
              label: 'First Aired',
              value: dayjs(releaseDate).format('MMMM DD, YYYY'),
          }
        : null;
    const runtimeRow = runtime
        ? { label: 'Runtime', value: `${runtime} min` }
        : null;

    return (
        <DetailLayout
            backdrop={backdrop}
            image={poster}
            imageAspect="landscape"
            alt={`${title} still`}
            title={
                <>
                    <Link
                        href={`/tv-shows/${showId}/seasons/${seasonNumber}`}
                        className="underline"
                    >
                        S{seasonNumber}
                    </Link>
                    {`:E${episodeNumber} ${title}`}
                </>
            }
            rating={averageVote}
            description={overview}
            metadata={[firstAiredRow, runtimeRow]}
        >
            <ItemCarousel
                title="Credits"
                items={credits.cast}
                link={`${episodeNumber}/credits`}
            />
        </DetailLayout>
    );
}
