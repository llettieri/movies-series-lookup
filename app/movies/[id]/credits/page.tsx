import { CreditsTable } from '@/components/credits-table';
import { Meta } from '@/components/meta';
import { SearchHint } from '@/components/search/search-hint';
import { getMovieCredits, getMovieDetails } from '@/services/movie-service';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import React, { ReactNode } from 'react';

export const generateMetadata = async ({
    params,
}: PageProps<'/movies/[id]/credits'>): Promise<Metadata> => {
    const movieId = (await params).id;
    const { title, type, overview, collection } =
        await getMovieDetails(movieId);

    return Meta({
        title: `${title} | Credits`,
        description: overview,
        keywords: [title, type, collection?.name]
            .filter((keyword) => keyword != undefined)
            .join(', '),
    });
};

export default async function MovieCreditsPage({
    params,
}: PageProps<'/movies/[id]/credits'>): Promise<ReactNode> {
    const readyOnlyHeaders = await headers();
    const { os, device } = userAgent({ headers: readyOnlyHeaders });
    const movieId = (await params).id;
    const { cast, crew } = await getMovieCredits(movieId);

    return (
        <>
            {device.type !== 'mobile' ? (
                <div className="container mx-auto flex justify-end">
                    <SearchHint os={os}></SearchHint>
                </div>
            ) : null}
            <CreditsTable cast={cast} crew={crew} title="Movie" />
        </>
    );
}
