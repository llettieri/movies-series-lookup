import { MediaList } from '@/components/lists/MediaList';
import { Meta } from '@/components/Meta';
import { getCollectionDetails } from '@/services/collection-service';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface CollectionPageProps {
    params: Promise<{ id: number }>;
}

export const generateMetadata = async ({
    params,
}: CollectionPageProps): Promise<Metadata> => {
    const collectionId = (await params).id;
    const { name } = await getCollectionDetails(collectionId);

    return Meta({ title: `${name} | Details` });
};

export default async function CollectionPage({
    params,
}: CollectionPageProps): Promise<ReactNode> {
    const collectionId = (await params).id;
    const collection = await getCollectionDetails(collectionId);

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <Image
                        src={
                            collection.backdrop ??
                            collection.poster ??
                            '/fallback.png'
                        }
                        width={1000}
                        height={600}
                        className="rounded-md"
                        loading="lazy"
                        alt="collection Wallpaper"
                    />
                    <h1 className="mt-4">{collection.name}</h1>
                    <p className="mt-4 text-sm">{collection.overview}</p>
                </div>
            </div>
            <MediaList title="Movies" medias={collection.parts} />
        </>
    );
}
