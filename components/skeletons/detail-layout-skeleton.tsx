import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollToTop } from '@/components/scroll-to-top';
import { BadgesSkeleton } from '@/components/skeletons/badges-skeleton';

interface DetailLayoutSkeletonProps {
    backdrop: boolean;
    subtitle?: boolean;
    genres?: boolean;
    portrait?: boolean;
    children?: ReactNode;
}

const DetailLayoutSkeleton = ({
    backdrop,
    children,
    portrait = true,
    subtitle = true,
    genres = true,
}: DetailLayoutSkeletonProps): ReactNode => {
    return (
        <>
            <ScrollToTop />
            {backdrop ? (
                <div className="mx-auto -mb-8 hidden max-w-4xl md:block 2xl:max-w-7xl">
                    <AspectRatio ratio={16 / 9}>
                        <Skeleton className="h-full w-full" />
                        <div className="to-background absolute inset-0 bg-linear-to-b from-transparent" />
                    </AspectRatio>
                </div>
            ) : null}
            <div className="container mx-auto max-w-4xl px-3 py-2">
                <div className="relative z-10 mb-4 flex flex-col gap-4 md:flex-row">
                    {portrait ? (
                        <div className="relative mx-auto w-70 shrink-0 md:m-0 md:w-50">
                            <AspectRatio ratio={2 / 3}>
                                <Skeleton className="h-full w-full rounded-md" />
                            </AspectRatio>
                        </div>
                    ) : null}
                    <div className="flex-1">
                        <Skeleton className="mb-8 h-10 w-3/4" />
                        {subtitle ? (
                            <Skeleton className="mb-6 h-7 w-1/2" />
                        ) : null}
                        <Skeleton className="mb-1 h-5 w-1/4" />
                        <Skeleton className="mb-1 h-5 w-1/5" />
                    </div>
                </div>
                {genres ? <BadgesSkeleton /> : null}
                <div className="grid gap-2">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                {children}
            </div>
        </>
    );
};

export { DetailLayoutSkeleton };
