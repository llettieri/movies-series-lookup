'use client';

import { CollectionType, ListType } from '@/app/page';
import { useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const HomeSubNavigation = (): ReactNode => {
    const searchParams = useSearchParams();
    const collection =
        (searchParams.get('collection') as CollectionType) ?? 'movies';
    const listType = (searchParams.get('listType') as ListType) ?? 'nowPlaying';

    return (
        <>
            <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                <Button
                    asChild
                    className={`flex-1 ${
                        collection === 'movies' ? 'underline' : ''
                    }`}
                >
                    <Link href={`?collection=movies&listType=${listType}`}>
                        Movies
                    </Link>
                </Button>
                <Button
                    asChild
                    className={`flex-1 ${
                        collection === 'tvshows' ? 'underline' : ''
                    }`}
                >
                    <Link href={`?collection=tvshows&listType=${listType}`}>
                        TV Series
                    </Link>
                </Button>
            </div>
            <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                <Button
                    asChild
                    className={`flex-1 ${
                        listType === 'popular' ? 'underline' : ''
                    }`}
                >
                    <Link href={`?collection=${collection}&listType=popular`}>
                        Popular
                    </Link>
                </Button>
                <Button
                    asChild
                    className={`flex-1 ${
                        listType === 'nowPlaying' ? 'underline' : ''
                    }`}
                >
                    <Link
                        href={`?collection=${collection}&listType=nowPlaying`}
                    >
                        Now Playing
                    </Link>
                </Button>
            </div>
        </>
    );
};
