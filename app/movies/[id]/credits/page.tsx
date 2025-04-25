import { CreditsTable } from '@/components/CreditsTable';
import { Meta } from '@/components/Meta';
import { SearchHint } from '@/components/SearchHint';
import { MediaType } from '@/models/MediaType';
import { getMovieCredits, getMovieDetails } from '@/services/movie-service';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import React, { ReactNode } from 'react';

interface MovieCreditsPageProps {
    params: Promise<{ id: number }>;
}

export const generateMetadata = async ({
    params,
}: MovieCreditsPageProps): Promise<Metadata> => {
    const movieId = (await params).id;
    const { title } = await getMovieDetails(movieId);

    return Meta({
        title: `${title} | Credits`,
        keywords: 'movie media streaming credits cast crew',
    });
};

export default async function MovieCreditsPage({
    params,
}: MovieCreditsPageProps): Promise<ReactNode> {
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
            <CreditsTable
                link={`/movies/${movieId}`}
                cast={cast}
                crew={crew}
                type={MediaType.MOVIE}
            />
        </>
    );
}
