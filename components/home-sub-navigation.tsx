'use client';

import { CollectionType, ListType } from '@/app/page';
import { Button } from '@/components/button';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';

export const HomeSubNavigation = (): ReactNode => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const collection =
        (searchParams.get('collection') as CollectionType) ?? 'movies';
    const listType = (searchParams.get('listType') as ListType) ?? 'nowPlaying';

    return (
        <>
            <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                <Button
                    title="Movies"
                    onClick={(): void =>
                        router.replace(
                            `?collection=movies&listType=${listType}`,
                            { scroll: false },
                        )
                    }
                    className={`flex-1 ${
                        collection === 'movies' ? 'underline' : ''
                    }`}
                />
                <Button
                    title="TV Series"
                    onClick={(): void =>
                        router.replace(
                            `?collection=tvshows&listType=${listType}`,
                            { scroll: false },
                        )
                    }
                    className={`flex-1 ${
                        collection === 'tvshows' ? 'underline' : ''
                    }`}
                />
            </div>
            <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                <Button
                    title="Popular"
                    onClick={(): void =>
                        router.replace(
                            `?collection=${collection}&listType=popular`,
                            { scroll: false },
                        )
                    }
                    className={`flex-1 ${
                        listType === 'popular' ? 'underline' : ''
                    }`}
                />
                <Button
                    title="Now Playing"
                    onClick={(): void =>
                        router.replace(
                            `?collection=${collection}&listType=nowPlaying`,
                            { scroll: false },
                        )
                    }
                    className={`flex-1 ${
                        listType === 'nowPlaying' ? 'underline' : ''
                    }`}
                />
            </div>
        </>
    );
};
