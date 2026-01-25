import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonBadges } from '@/components/skeletons/skeleton-badge';
import { SkeletonCardCarousel } from '@/components/skeletons/skeleton-card-carousel';
import { SkeletonCardVerticalList } from '@/components/skeletons/skeleton-card-vertical-list';

export default function MovieLoadingPage(): ReactNode {
    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative">
                        <Skeleton className="aspect-auto h-[300] w-full md:h-[490]" />
                    </div>
                    <SkeletonBadges />
                    <Skeleton className="mb-8 h-10 w-2/3" />
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
