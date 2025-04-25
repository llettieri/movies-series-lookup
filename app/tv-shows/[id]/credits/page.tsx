import { CreditsTable } from '@/components/CreditsTable';
import { Meta } from '@/components/Meta';
import { SearchHint } from '@/components/SearchHint';
import { MediaType } from '@/models/MediaType';
import {
    getTVShowDetails,
    getTVShowsCredits,
} from '@/services/tv-show-service';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import React, { ReactNode } from 'react';

interface TVShowCreditsPageProps {
    params: Promise<{ id: number }>;
}

export const generateMetadata = async ({
    params,
}: TVShowCreditsPageProps): Promise<Metadata> => {
    const showId = (await params).id;
    const { title } = await getTVShowDetails(showId);

    return Meta({
        title: `${title} | Credits`,
        keywords: 'tv-show media streaming credits cast crew',
    });
};

export default async function TVShowCreditsPage({
    params,
}: TVShowCreditsPageProps): Promise<ReactNode> {
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
            <CreditsTable
                link={`/tv-shows/${showId}`}
                cast={cast}
                crew={crew}
                type={MediaType.TV}
            />
        </>
    );
}
