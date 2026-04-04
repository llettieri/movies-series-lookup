import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BadgesSkeleton } from '@/components/skeletons/badges-skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollToTop } from '@/components/scroll-to-top';

export default function TVShowSeasonsLoadingPage(): ReactNode {
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
                    <div className="grid gap-2">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <CardVerticalListSkeleton title="Seasons" />
            </div>
        </>
    );
}
