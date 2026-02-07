import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollToTop } from '@/components/scroll-to-top';

export default function CollectionLoadingPage(): ReactNode {
    return (
        <>
            <ScrollToTop />
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <AspectRatio ratio={16 / 9} asChild>
                        <Skeleton className="aspect-auto h-full w-full" />
                    </AspectRatio>
                    <Skeleton className="mt-4 h-10 w-2/3" />

                    <div className="mt-4 grid gap-2">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <CardVerticalListSkeleton title="Movies" itemCount={6} />
            </div>
        </>
    );
}
