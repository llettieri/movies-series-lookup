import React, { ReactNode } from 'react';
import { DetailLayoutSkeleton } from '@/components/skeletons/detail-layout-skeleton';
import { CardCarouselSkeleton } from '@/components/skeletons/card-carousel-skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { WatchProvidersSkeleton } from '@/components/skeletons/watch-providers-skeleton';
import { BadgesSkeleton } from '@/components/skeletons/badges-skeleton';

export default function MovieLoadingPage(): ReactNode {
    return (
        <>
            <DetailLayoutSkeleton backdrop={true}>
                <BadgesSkeleton />
                <WatchProvidersSkeleton />
                <CardCarouselSkeleton title="Credits" />
            </DetailLayoutSkeleton>
            <CardVerticalListSkeleton title="Similar Movies" />
        </>
    );
}
