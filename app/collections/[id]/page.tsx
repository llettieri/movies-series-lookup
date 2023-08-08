import { getCollectionDetails } from '@/app/api/services/CollectionService';
import MediaList from '@/components/lists/MediaList';
import { Meta } from '@/components/Meta';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface CollectionPageProps {
    params: {
        id: number;
    };
}

export async function generateMetadata({
    params,
}: CollectionPageProps): Promise<Metadata> {
    const collection = await getCollectionDetails(params.id);
    return Meta({ title: `${collection.name} | Details` });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function CollectionPage({
    params,
}: CollectionPageProps): Promise<ReactNode> {
    const collection = await getCollectionDetails(params.id);

    return (
        <div>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <Image
                        src={
                            collection.backdrop ??
                            collection.poster ??
                            '/placeholder.png'
                        }
                        width={1000}
                        height={600}
                        className="rounded-md"
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                        loading="lazy"
                        alt="collection Wallpaper"
                    />
                    <h1 className="my-2 text-xl font-bold text-primary">
                        {collection.name}
                    </h1>
                    <p className="mt-4 text-sm text-primaryText">
                        {collection.overview}
                    </p>
                </div>
                <MediaList title="" medias={collection.parts} />
            </div>
        </div>
    );
}
