import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonCardVerticalList } from '@/components/skeletons/skeleton-card-vertical-list';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function PeopleLoadingPage(): ReactNode {
    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="mx-auto mb-4 block max-w-70 md:max-w-sm">
                        <AspectRatio ratio={9 / 16}>
                            <Skeleton className="h-full w-full object-cover" />
                        </AspectRatio>
                    </div>
                    <Skeleton className="mb-8 h-10 w-2/3" />
                    <div className="grid gap-2">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-[96%]" />
                        <Skeleton className="h-4 w-[98%]" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-[98%]" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-[96%]" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                    <div className="mt-6 flex items-center gap-1">
                        <p className="text-sm">Birthday:</p>
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <SkeletonCardVerticalList title="Their Movies" />
            </div>
        </>
    );
}
