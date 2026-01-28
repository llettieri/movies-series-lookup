import React, { ReactNode } from 'react';
import { SkeletonCreditsTable } from '@/components/skeletons/skeleton-credits-table';

export default function TVShowCreditsLoadingPage(): ReactNode {
    return (
        <>
            <div className="container mx-auto hidden h-12 md:block"></div>
            <SkeletonCreditsTable title="TV Show" />
        </>
    );
}
