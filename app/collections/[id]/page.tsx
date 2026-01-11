import { MediaList } from '@/components/lists/media-list';
import { Meta } from '@/components/meta';
import { getCollectionDetails } from '@/services/collection-service';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';
import { TMDBImage } from '@/components/image';

export const generateMetadata = async ({
    params,
}: PageProps<'/collections/[id]'>): Promise<Metadata> => {
    const collectionId = (await params).id;
    const { name } = await getCollectionDetails(collectionId);

    return Meta({ title: `${name} | Details` });
};

export default async function CollectionPage({
    params,
}: PageProps<'/collections/[id]'>): Promise<ReactNode> {
    const collectionId = (await params).id;
    const { backdrop, name, overview, parts, poster } =
        await getCollectionDetails(collectionId);
    const image = backdrop ?? poster;

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <TMDBImage
                        src={image}
                        width={1000}
                        height={600}
                        className="rounded-md"
                        alt="collection Wallpaper"
                        scope={backdrop ? 'backdrop' : 'poster'}
                        loading="eager"
                    />
                    <h1 className="mt-4">{name}</h1>
                    <p className="mt-4 text-sm">{overview}</p>
                </div>
            </div>
            <MediaList title="Movies" medias={parts} />
        </>
    );
}
