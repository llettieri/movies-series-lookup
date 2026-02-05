import { MediaList } from '@/components/lists/media-list';
import { Meta } from '@/components/meta';
import { getCollectionDetails } from '@/services/collection-service';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';
import { TMDBImage } from '@/components/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    const ratio = backdrop ? 16 / 9 : 9 / 16;
    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <AspectRatio ratio={ratio} asChild>
                        <TMDBImage
                            id="backdrop"
                            src={image}
                            className="rounded-md object-cover"
                            alt={`${name} backdrop image`}
                            scope={backdrop ? 'backdrop' : 'poster'}
                            fill
                        />
                    </AspectRatio>

                    <h1 id="name" className="mt-4">
                        {name}
                    </h1>
                    <p id="description" className="mt-4 text-sm">
                        {overview}
                    </p>
                </div>
            </div>

            <MediaList title="Movies" medias={parts} />
        </>
    );
}
