import { CreditsTable } from '@/components/CreditsTable';
import { Meta } from '@/components/Meta';
import { MediaType } from '@/models/MediaType';
import { getMovieCredits, getMovieDetails } from '@/services/MovieService';
import { Alert, Kbd } from 'flowbite-react';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import React, { ReactNode } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

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
    const { os } = userAgent({ headers: readyOnlyHeaders });
    const movieId = (await params).id;
    const { cast, crew } = await getMovieCredits(movieId);

    return (
        <>
            <div className="container mx-auto flex justify-end">
                <Alert color="dark" icon={IoAlertCircleOutline}>
                    <span>
                        Please press{' '}
                        {os.name?.toLowerCase().includes('mac') ? (
                            <Kbd>Cmd</Kbd>
                        ) : (
                            <Kbd>Ctrl</Kbd>
                        )}{' '}
                        + <Kbd>F</Kbd> to search for an individual person.
                    </span>
                </Alert>
            </div>
            <CreditsTable
                link={`/movies/${movieId}`}
                cast={cast}
                crew={crew}
                type={MediaType.MOVIE}
            />
        </>
    );
}
