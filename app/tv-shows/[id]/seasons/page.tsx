import { Meta } from '@/components/meta';
import { getTVShowDetails } from '@/services/tv-show-service';
import { Metadata } from 'next';
import React, { ReactNode, Suspense } from 'react';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { ItemList } from '@/components/lists/item-list';
import { DetailLayout } from '@/components/detail-layout';

export const generateMetadata = async ({
    params,
}: PageProps<'/tv-shows/[id]/seasons'>): Promise<Metadata> => {
    const showId = (await params).id;

    const { title, type, overview, collection } =
        await getTVShowDetails(showId);

    return Meta({
        title: `${title} | Seasons`,
        description: overview,
        keywords: [title, type, collection?.name]
            .filter((keyword) => keyword != undefined)
            .join(', '),
    });
};

export default async function TVShowSeasonsPage({
    params,
}: PageProps<'/tv-shows/[id]/seasons'>): Promise<ReactNode> {
    const showId = (await params).id;
    const { title, seasons, backdrop, poster, genres, homepage, overview } =
        await getTVShowDetails(showId);

    return (
        <>
            <DetailLayout
                backdrop={backdrop}
                image={poster}
                imageAspect="portrait"
                alt={`${title} backdrop image`}
                title={title}
                genres={genres}
                homepage={homepage}
                description={overview}
            />
            <Suspense fallback={<CardVerticalListSkeleton title="Seasons" />}>
                <ItemList title="Seasons" items={seasons} />
            </Suspense>
        </>
    );
}
