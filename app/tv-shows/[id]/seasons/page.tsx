import { Meta } from '@/components/meta';
import { getTVShowDetails } from '@/services/tv-show-service';
import { Metadata } from 'next';
import React, { ReactNode, Suspense } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { TMDBImage } from '@/components/image';
import { GenreBadges } from '@/components/genre-badges';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { ItemList } from '@/components/lists/item-list';

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
    const { title, seasons, backdrop, genres, homepage, overview } =
        await getTVShowDetails(showId);

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative">
                        <AspectRatio ratio={16 / 9}>
                            <TMDBImage
                                id="backdrop"
                                src={backdrop}
                                className="rounded-md object-cover"
                                alt={`${title} backdrop image`}
                                scope="backdrop"
                                fill
                                sizes="(min-width: 48rem) 80rem, 18.75rem"
                            />
                        </AspectRatio>
                    </div>
                    <GenreBadges genres={genres} />

                    <h1 id="title">
                        {homepage ? (
                            <a
                                href={homepage}
                                target="_blank"
                                className="underline"
                                rel="noreferrer"
                            >
                                {title}
                            </a>
                        ) : (
                            title
                        )}
                    </h1>
                    <p id="description" className="mt-4 text-sm">
                        {overview}
                    </p>
                </div>
            </div>
            <div className="pt-2">
                <Suspense
                    fallback={<CardVerticalListSkeleton title="Seasons" />}
                >
                    <ItemList title="Seasons" items={seasons} />
                </Suspense>
            </div>
        </>
    );
}
