import { CreditsTable } from '@/components/CreditsTable';
import { Meta } from '@/components/Meta';
import { MediaType } from '@/models/MediaType';
import { getTVShowDetails, getTVShowsCredits } from '@/services/TVShowService';
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
    return Meta({
        title: `${title} | Credits`,
        keywords: 'tv-show media streaming credits cast crew',
    });
};

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
