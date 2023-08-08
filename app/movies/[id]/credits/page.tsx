import { getMovieCredits } from '@/app/api/services/MovieService';
import CreditsTable from '@/components/CreditsTable';
import { MediaType } from '@/models/MediaType';
import React, { ReactNode } from 'react';

interface MovieCreditsPageProps {
    params: { id: number };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
