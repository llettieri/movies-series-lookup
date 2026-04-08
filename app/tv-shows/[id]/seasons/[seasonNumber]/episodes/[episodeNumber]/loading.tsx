import React, { ReactNode } from 'react';
import { DetailLayoutSkeleton } from '@/components/skeletons/detail-layout-skeleton';
import { CardCarouselSkeleton } from '@/components/skeletons/card-carousel-skeleton';

export default function TVShowSeasonEpisodeLoadingPage(): ReactNode {
    return (
        <DetailLayoutSkeleton
            backdrop={true}
            portrait={false}
            genres={false}
            subtitle={false}
        >
            <CardCarouselSkeleton title="Credits" />
        </DetailLayoutSkeleton>
    );
}
