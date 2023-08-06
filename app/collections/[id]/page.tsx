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
            <div className="container max-w-4xl mx-auto py-6">
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
                    <h1 className="font-bold text-primary text-xl my-2">
                        {collection.name}
                    </h1>
                    <p className="text-primaryText text-sm mt-4">
                        {collection.overview}
                    </p>
                </div>
                <MediaList title="" medias={collection.parts} />
            </div>
        </div>
    );
}
