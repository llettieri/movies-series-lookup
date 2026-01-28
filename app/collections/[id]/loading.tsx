import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonCardVerticalList } from '@/components/skeletons/skeleton-card-vertical-list';

export default function CollectionLoadingPage(): ReactNode {
    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative">
                        <Skeleton className="aspect-auto h-[490] w-full" />
                    </div>
                    <Skeleton className="mt-4 h-10 w-2/3" />

                    <div className="mt-4 grid gap-2">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <SkeletonCardVerticalList title="Movies" itemCount={6} />
            </div>
        </>
    );
}
