import React, { ReactNode } from 'react';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { DetailLayoutSkeleton } from '@/components/skeletons/detail-layout-skeleton';

export default function TVShowSeasonsLoadingPage(): ReactNode {
    return (
        <>
            <DetailLayoutSkeleton backdrop={true} subtitle={false} />
            <CardVerticalListSkeleton title="Seasons" itemCount={9} />
        </>
    );
}
