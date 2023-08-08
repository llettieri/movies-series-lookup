import {
    getTVShowDetails,
    getTVShowsCredits,
} from '@/app/api/services/TVShowService';
import { CreditsTable } from '@/components/CreditsTable';
import { Meta } from '@/components/Meta';
import { MediaType } from '@/models/MediaType';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface TVShowCreditsPageProps {
    params: {
        id: number;
    };
}

export const generateMetadata = async ({
    params,
}: TVShowCreditsPageProps): Promise<Metadata> => {
    const { title } = await getTVShowDetails(params.id);
    return Meta({ title: `${title} | Credits` });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function TVShowCreditsPage({
    params,
}: TVShowCreditsPageProps): Promise<ReactNode> {
    const { cast, crew } = await getTVShowsCredits(params.id);

    return (
        <CreditsTable
            link={`/tv-shows/${params.id}`}
            cast={cast}
            crew={crew}
            type={MediaType.TV}
        />
    );
}
