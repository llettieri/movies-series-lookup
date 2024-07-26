'use client';

import { CollectionType, ListType } from '@/app/page';
import { Button } from '@/components/Button';
import { updateSearchParams } from '@/hooks/updateSearchParams';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

export const HomeSubNav = (): ReactNode => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [collection, setCollection] = useState<CollectionType>();
    const [listType, setListType] = useState<ListType>();

    useEffect(() => {
        const collection =
            (searchParams.get('collection') as CollectionType) ?? 'movies';
        const listType =
            (searchParams.get('listType') as ListType) ?? 'nowPlaying';

        setCollection(collection);
        setListType(listType);

        updateSearchParams(
            router,
            searchParams,
            ['collection', collection],
            ['listType', listType],
        );
    }, [searchParams, router]);

    return (
        <>
            <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                <Button
                    title="Movies"
                    onClick={(): void =>
                        updateSearchParams(router, searchParams, [
                            'collection',
                            'movies',
                        ])
                    }
                    className={`flex-1 ${
                        collection === 'movies' ? 'font-bold' : ''
                    }`}
                />
                <Button
                    title="TV Series"
                    onClick={(): void =>
                        updateSearchParams(router, searchParams, [
                            'collection',
                            'tvshows',
                        ])
                    }
                    className={`flex-1 ${
                        collection === 'tvshows' ? 'font-bold' : ''
                    }`}
                />
            </div>
            <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                <Button
                    title="Popular"
                    onClick={(): void =>
                        updateSearchParams(router, searchParams, [
                            'listType',
                            'popular',
                        ])
                    }
                    className={`flex-1 ${
                        listType === 'popular' ? 'font-bold' : ''
                    }`}
                />
                <Button
                    title="Now Playing"
                    onClick={(): void =>
                        updateSearchParams(router, searchParams, [
                            'listType',
                            'nowPlaying',
                        ])
                    }
                    className={`flex-1 ${
                        listType === 'nowPlaying' ? 'font-bold' : ''
                    }`}
                />
            </div>
        </>
    );
};
