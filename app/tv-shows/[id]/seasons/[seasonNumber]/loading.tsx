import React, { ReactNode } from 'react';
import { DetailLayoutSkeleton } from '@/components/skeletons/detail-layout-skeleton';
import { CardCarouselSkeleton } from '@/components/skeletons/card-carousel-skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { WatchProvidersSkeleton } from '@/components/skeletons/watch-providers-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function TVShowSeasonLoadingPage(): ReactNode {
    return (
        <>
            <DetailLayoutSkeleton backdrop={false} genres={false}>
                <div className="mt-8 flex w-full items-center gap-4">
                    <p className="text-md">Networks:</p>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-8 w-16" />
                    ))}
                </div>
                <WatchProvidersSkeleton />
                <CardCarouselSkeleton title="Credits" />
            </DetailLayoutSkeleton>
            <CardVerticalListSkeleton title="Episodes" />
        </>
    );
}
