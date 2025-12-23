'use client';

import { CollectionType, ListType } from '@/app/page';
import { Button } from '@/components/button';
import { redirect, useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';

export const HomeSubNavigation = (): ReactNode => {
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
                        redirect(`?collection=movies&listType=${listType}`)
                    }
                    className={`flex-1 ${
                        collection === 'movies' ? 'underline' : ''
                    }`}
                />
                <Button
                    title="TV Series"
                    onClick={(): void =>
                        redirect(`?collection=tvshows&listType=${listType}`)
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
                        redirect(`?collection=${collection}&listType=popular`)
                    }
                    className={`flex-1 ${
                        listType === 'popular' ? 'underline' : ''
                    }`}
                />
                <Button
                    title="Now Playing"
                    onClick={(): void =>
                        redirect(
                            `?collection=${collection}&listType=nowPlaying`,
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
