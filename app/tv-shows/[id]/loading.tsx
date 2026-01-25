import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonBadges } from '@/components/skeletons/skeleton-badge';
import { SkeletonCardCarousel } from '@/components/skeletons/skeleton-card-carousel';
import { SkeletonCardVerticalList } from '@/components/skeletons/skeleton-card-vertical-list';

export default function TVShowLoadingPage(): ReactNode {
    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <div className="relative">
                        <Skeleton className="aspect-auto h-[300] w-full md:h-[490]" />
                    </div>
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
                    <div className="flex items-center gap-1">
                        <p className="text-sm">Last Aired:</p>
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <SkeletonCardCarousel />
                    <div className="container mx-auto flex items-center gap-4 align-middle">
                        <p className="text-md leading-[10]">Networks:</p>
                        {Array.from({ length: 3 }).map((value, index) => (
                            <Skeleton key={index} className="h-8 w-16" />
                        ))}
                    </div>
                    <div className="container mx-auto flex items-center gap-4 align-middle">
                        <p className="text-md">Watch Providers:</p>
                        {Array.from({ length: 3 }).map((value, index) => (
                            <Skeleton key={index} className="h-12 w-12" />
                        ))}
                    </div>
                    <p className="mt-6 text-sm">
                        JustWatch makes it easy to find out where you can
                        legally watch your favorite movies & TV shows online.
                        Visit{' '}
                        <span className="underline">
                            <a target="_blank" href="https://www.justwatch.com">
                                JustWatch
                            </a>
                        </span>{' '}
                        for more information.
                    </p>{' '}
                </div>
            </div>
            <div className="pt-2">
                <SkeletonCardVerticalList title="Similar Shows" />
            </div>
        </>
    );
}
