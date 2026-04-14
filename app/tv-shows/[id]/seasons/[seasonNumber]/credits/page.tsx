import { CreditsTable } from '@/components/credits-table';
import { Meta } from '@/components/meta';
import { SearchHint } from '@/components/search/search-hint';
import {
    getTVShowDetails,
    getTVShowSeasonCredits,
    getTVShowSeasonDetails,
} from '@/services/tv-show-service';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import React, { ReactNode } from 'react';

export const generateMetadata = async ({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]/credits'>): Promise<Metadata> => {
    const showId = (await params).id;
    const seasonNumber = Number((await params).seasonNumber);

    const { title, type, overview } = await getTVShowSeasonDetails(
        showId,
        seasonNumber,
    );
    const { title: showTitle, overview: showOverview } =
        await getTVShowDetails(showId);

    return Meta({
        title: `${showTitle} | S${seasonNumber} | Credits`,
        description: overview || showOverview,
        keywords: [showTitle, title, type]
            .filter((keyword) => keyword != undefined)
            .join(', '),
    });
};

export default async function TVShowSeasonCreditsPage({
    params,
}: PageProps<'/tv-shows/[id]/seasons/[seasonNumber]/credits'>): Promise<ReactNode> {
    const readyOnlyHeaders = await headers();
    const { os, device } = userAgent({ headers: readyOnlyHeaders });
    const showId = (await params).id;
    const seasonNumber = Number((await params).seasonNumber);
    const { cast, crew } = await getTVShowSeasonCredits(showId, seasonNumber);

    return (
        <>
            {device.type !== 'mobile' ? (
                <div className="container mx-auto flex justify-end">
                    <SearchHint os={os}></SearchHint>
                </div>
            ) : null}
            <CreditsTable cast={cast} crew={crew} title="Season" />
        </>
    );
}
