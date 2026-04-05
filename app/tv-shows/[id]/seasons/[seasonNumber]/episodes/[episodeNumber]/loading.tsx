import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CardCarouselSkeleton } from '@/components/skeletons/card-carousel-skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollToTop } from '@/components/scroll-to-top';

export default function TVShowSeasonEpisodeLoadingPage(): ReactNode {
    return (
        <>
            <ScrollToTop />
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <AspectRatio ratio={16 / 9} className="mb-4">
                        <Skeleton className="aspect-auto h-full w-full" />
                    </AspectRatio>
                    <div className="mb-8 flex flex-col gap-1">
                        <Skeleton className="h-10 w-full md:w-2/3" />
                        <Skeleton className="h-10 w-2/3 md:hidden" />
                    </div>
                    <Skeleton className="mb-6 h-7 w-56" />
                    <div className="grid gap-2">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="mt-6 flex items-center gap-1">
                        <p className="text-md">Release Date:</p>
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <CardCarouselSkeleton title="Credits" />
                </div>
            </div>
        </>
    );
}
