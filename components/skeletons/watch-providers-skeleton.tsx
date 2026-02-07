import React, { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const WatchProvidersSkeleton = (): ReactNode => {
    return (
        <div id="watch-providers" className="mt-4 w-full">
            <div className="flex flex-wrap items-center gap-4 align-middle">
                <p className="text-md w-auto">Watch Providers: </p>
                <div className="flex gap-4">
                    {Array.from({ length: 5 }).map((value, index) => (
                        <Skeleton key={index} className="h-12 w-12" />
                    ))}
                </div>
            </div>
            <p className="mt-6 text-sm">
                JustWatch makes it easy to find out where you can legally watch
                your favorite movies & TV shows online. Visit{' '}
                <span className="underline">
                    <a target="_blank" href="https://www.justwatch.com">
                        JustWatch
                    </a>
                </span>{' '}
                for more information.
            </p>
        </div>
    );
};
