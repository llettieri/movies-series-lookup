import React, { ReactNode } from 'react';
import { SkeletonCreditsTable } from '@/components/skeletons/skeleton-credits-table';
import { ScrollToTop } from '@/components/scroll-to-top';

export default function TVShowCreditsLoadingPage(): ReactNode {
    return (
        <>
            <ScrollToTop />
            <div className="container mx-auto hidden h-12 md:block"></div>
            <SkeletonCreditsTable title="TV Show" />
        </>
    );
}
