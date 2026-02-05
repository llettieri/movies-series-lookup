import { CreditsTable } from '@/components/credits-table';
import { Meta } from '@/components/meta';
import { SearchHint } from '@/components/search-hint';
import { MediaType } from '@/models/media-type';
import {
    getTVShowDetails,
    getTVShowsCredits,
} from '@/services/tv-show-service';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import React, { ReactNode } from 'react';

export const generateMetadata = async ({
    params,
}: PageProps<'/tv-shows/[id]/credits'>): Promise<Metadata> => {
    const showId = (await params).id;
    const { title } = await getTVShowDetails(showId);

    return Meta({
        title: `${title} | Credits`,
        keywords: 'tv-show media streaming credits cast crew',
    });
};

export default async function TVShowCreditsPage({
    params,
}: PageProps<'/tv-shows/[id]/credits'>): Promise<ReactNode> {
    const readyOnlyHeaders = await headers();
    const { os, device } = userAgent({ headers: readyOnlyHeaders });
    const showId = (await params).id;
    const { cast, crew } = await getTVShowsCredits(showId);

    return (
        <>
            {device.type !== 'mobile' ? (
                <div className="container mx-auto flex justify-end">
                    <SearchHint os={os}></SearchHint>
                </div>
            ) : null}
            <CreditsTable cast={cast} crew={crew} type={MediaType.TV} />
        </>
    );
}
