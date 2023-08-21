'use client';

import { Button } from '@/components/Button';
import { Hero } from '@/components/Hero';
import { AiringTodayTVShowsList } from '@/components/lists/AiringTodayTVShowsList';
import { LatestMoviesList } from '@/components/lists/LatestMoviesList';
import { PopularMoviesList } from '@/components/lists/PopularMoviesList';
import { PopularTVShowsList } from '@/components/lists/PopularTVShowsList';
import Loading from '@/components/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

type Collection = 'movies' | 'tvshows';
type ListType = 'popular' | 'nowPlaying';

const List = {
    movies: {
        popular: <PopularMoviesList />,
        nowPlaying: <LatestMoviesList />,
    },
    tvshows: {
        popular: <PopularTVShowsList />,
        nowPlaying: <AiringTodayTVShowsList />,
    },
};

export default function Home(): ReactNode {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [collection, setCollection] = useState<Collection>();
    const [listType, setListType] = useState<ListType>();

    useEffect(() => {
        const collection =
            (searchParams.get('collection') as Collection) ?? 'movies';
        const listType =
            (searchParams.get('listType') as ListType) ?? 'popular';

        setCollection(collection);
        setListType(listType);

        router.replace(`?collection=${collection}&listType=${listType}`);
    }, [searchParams, router]);

    const toggleHandler = (value: Collection | ListType, key: string): void => {
        if (key === 'collection') {
            router.replace(`?collection=${value}&listType=${listType}`);
        } else {
            router.replace(`?collection=${collection}&listType=${value}`);
        }
    };

    return (
        <>
            <div>
                <Hero />
                <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                    <Button
                        title="Movies"
                        onClick={(): void =>
                            toggleHandler('movies', 'collection')
                        }
                        className={`flex-1 ${
                            collection === 'movies' ? 'font-bold' : ''
                        }`}
                    />
                    <Button
                        title="TV Series"
                        onClick={(): void =>
                            toggleHandler('tvshows', 'collection')
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
                            toggleHandler('popular', 'listType')
                        }
                        className={`flex-1 ${
                            listType === 'popular' ? 'font-bold' : ''
                        }`}
                    />
                    <Button
                        title="Now Playing"
                        onClick={(): void =>
                            toggleHandler('nowPlaying', 'listType')
                        }
                        className={`flex-1 ${
                            listType === 'nowPlaying' ? 'font-bold' : ''
                        }`}
                    />
                </div>
            </div>
            {collection && listType ? List[collection][listType] : <Loading />}
        </>
    );
}
