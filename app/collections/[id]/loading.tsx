import React, { ReactNode } from 'react';
import { DetailLayoutSkeleton } from '@/components/skeletons/detail-layout-skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';

export default function CollectionLoadingPage(): ReactNode {
    return (
        <>
            <DetailLayoutSkeleton subtitle={false} backdrop={true} />
            <CardVerticalListSkeleton title="Movies" />
        </>
    );
}
