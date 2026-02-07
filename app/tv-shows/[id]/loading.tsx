import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BadgesSkeleton } from '@/components/skeletons/badges-skeleton';
import { CardCarouselSkeleton } from '@/components/skeletons/card-carousel-skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollToTop } from '@/components/scroll-to-top';
import { WatchProvidersSkeleton } from '@/components/skeletons/watch-providers-skeleton';

export default function TVShowLoadingPage(): ReactNode {
    return (
        <>
            <ScrollToTop />
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <AspectRatio ratio={16 / 9}>
                        <Skeleton className="aspect-auto h-full w-full" />
                    </AspectRatio>
                    <BadgesSkeleton />
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
                        <p className="text-sm">Release Date:</p>
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="text-sm">Last Aired:</p>
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <CardCarouselSkeleton />
                    <div className="mt-8 flex w-full items-center gap-4">
                        <p className="text-md">Networks:</p>
                        {Array.from({ length: 3 }).map((value, index) => (
                            <Skeleton key={index} className="h-8 w-16" />
                        ))}
                    </div>
                    <WatchProvidersSkeleton />
                </div>
            </div>
            <div className="pt-2">
                <CardVerticalListSkeleton title="Similar Shows" />
            </div>
        </>
    );
}
