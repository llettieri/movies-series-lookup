import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonBadges } from '@/components/skeletons/skeleton-badge';
import { SkeletonCardCarousel } from '@/components/skeletons/skeleton-card-carousel';
import { SkeletonCardVerticalList } from '@/components/skeletons/skeleton-card-vertical-list';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollToTop } from '@/components/scroll-to-top';

export default function MovieLoadingPage(): ReactNode {
    return (
        <>
            <ScrollToTop />
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <AspectRatio ratio={16 / 9}>
                        <Skeleton className="aspect-auto h-full w-full" />
                    </AspectRatio>
                    <SkeletonBadges />
                    <div className="mb-8 flex flex-col gap-1">
                        <Skeleton className="h-10 w-full md:w-2/3" />
                        <Skeleton className="h-10 w-2/3 md:hidden" />
                    </div>
                    <Skeleton className="mb-6 h-7 w-56" />

                    <div className="grid gap-2">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="mt-6 flex items-center gap-1">
                        <p className="text-sm">Release Date:</p>
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <SkeletonCardCarousel />
                </div>
            </div>
            <div className="pt-2">
                <SkeletonCardVerticalList title="Similar Movies" />
            </div>
        </>
    );
}
