import React, { ReactNode } from 'react';
import { DetailLayoutSkeleton } from '@/components/skeletons/detail-layout-skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';

export default function PeopleLoadingPage(): ReactNode {
    return (
        <>
            <DetailLayoutSkeleton
                backdrop={false}
                subtitle={false}
                genres={false}
            />
            <CardVerticalListSkeleton title="Their Movies" />
            <CardVerticalListSkeleton title="Their TV Shows" />
        </>
    );
}
