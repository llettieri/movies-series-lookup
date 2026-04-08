import { DetailLayout } from '@/components/detail-layout';
import { Meta } from '@/components/meta';
import { getCollectionDetails } from '@/services/collection-service';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';
import { ItemList } from '@/components/lists/item-list';

export const generateMetadata = async ({
    params,
}: PageProps<'/collections/[id]'>): Promise<Metadata> => {
    const collectionId = (await params).id;
    const { name, overview, type } = await getCollectionDetails(collectionId);

    return Meta({
        title: `${name} | Details`,
        description: overview,
        keywords: [name, type].join(', '),
    });
};

export default async function CollectionPage({
    params,
}: PageProps<'/collections/[id]'>): Promise<ReactNode> {
    const collectionId = (await params).id;
    const { backdrop, name, overview, parts, poster } =
        await getCollectionDetails(collectionId);

    return (
        <>
            <DetailLayout
                backdrop={backdrop}
                image={poster}
                imageAspect="portrait"
                alt={`${name} poster`}
                title={name}
                description={overview}
            />
            <ItemList title="Movies" items={parts} />
        </>
    );
}
