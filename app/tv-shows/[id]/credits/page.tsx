import { CreditsTable } from '@/components/CreditsTable';
import { Meta } from '@/components/Meta';
import { MediaType } from '@/models/MediaType';
import { getTVShowDetails, getTVShowsCredits } from '@/services/TVShowService';
import { Metadata } from 'next';
import { ReactNode } from 'react';

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
    const showId = (await params).id;
    const { cast, crew } = await getTVShowsCredits(showId);

    return (
        <CreditsTable
            link={`/tv-shows/${showId}`}
            cast={cast}
            crew={crew}
            type={MediaType.TV}
        />
    );
}
