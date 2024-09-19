import { CreditsTable } from '@/components/CreditsTable';
import { Meta } from '@/components/Meta';
import { MediaType } from '@/models/MediaType';
import { getMovieCredits, getMovieDetails } from '@/services/MovieService';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

interface MovieCreditsPageProps {
    params: { id: number };
}

export const generateMetadata = async ({
    params,
}: MovieCreditsPageProps): Promise<Metadata> => {
    const { title } = await getMovieDetails(params.id);
    return Meta({
        title: `${title} | Credits`,
        keywords: 'movie media streaming credits cast crew',
    });
};

export default async function MovieCreditsPage({
    params,
}: MovieCreditsPageProps): Promise<ReactNode> {
    const { cast, crew } = await getMovieCredits(params.id);

    return (
        <CreditsTable
            link={`/movies/${params.id}`}
            cast={cast}
            crew={crew}
            type={MediaType.MOVIE}
        />
    );
}
