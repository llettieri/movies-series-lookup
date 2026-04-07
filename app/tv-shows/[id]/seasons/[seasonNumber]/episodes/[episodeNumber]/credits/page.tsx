import { CreditsTable } from '@/components/credits-table';
import { Meta } from '@/components/meta';
import { SearchHint } from '@/components/search-hint';
import {
    getTVShowDetails,
    getTVShowSeasonEpisodeCredits,
    getTVShowSeasonEpisodeDetails,
} from '@/services/tv-show-service';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import React, { ReactNode } from 'react';

export const generateMetadata = async ({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]/episodes/[episodeNumber]/credits'>): Promise<Metadata> => {
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
        title: `${showTitle} | S${seasonNumber}:E${episodeNumber} | Credits`,
        description: overview || showOverview,
        keywords: [showTitle, title, type]
            .filter((keyword) => keyword != undefined)
            .join(', '),
    });
};

export default async function TVShowSeasonEpisodeCreditsPage({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]/episodes/[episodeNumber]/credits'>): Promise<ReactNode> {
    const readyOnlyHeaders = await headers();
    const { os, device } = userAgent({ headers: readyOnlyHeaders });
    const showId = (await params).id;
    const seasonNumber = Number((await params).seasonNumber);
    const episodeNumber = Number((await params).episodeNumber);
    const { cast, crew } = await getTVShowSeasonEpisodeCredits(
        showId,
        seasonNumber,
        episodeNumber,
    );

    return (
        <>
            {device.type !== 'mobile' ? (
                <div className="container mx-auto flex justify-end">
                    <SearchHint os={os}></SearchHint>
                </div>
            ) : null}
            <CreditsTable cast={cast} crew={crew} title="Episode" />
        </>
    );
}
