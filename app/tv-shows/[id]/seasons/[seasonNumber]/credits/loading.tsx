import React, { ReactNode } from 'react';
import { CreditsTableSkeleton } from '@/components/skeletons/credits-table-skeleton';
import { ScrollToTop } from '@/components/scroll-to-top';

export default function TVShowSeasonCreditsLoadingPage(): ReactNode {
    return (
        <>
            <ScrollToTop />
            <div className="container mx-auto hidden h-12 md:block"></div>
            <CreditsTableSkeleton title="TV Show Season" />
        </>
    );
}
