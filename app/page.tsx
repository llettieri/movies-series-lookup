import { Hero } from '@/components/Hero';
import { HomeSubNav } from '@/components/HomeSubNav';
import { MediaList } from '@/components/lists/MediaList';
import { Media } from '@/models/Media';
import { getLatestMovies, getPopularMovies } from '@/services/MovieService';
import { getSession } from '@/services/SessionService';
import { getAiringTodayShows, getPopularShows } from '@/services/TVShowService';
import React, { ReactNode } from 'react';

export type CollectionType = 'movies' | 'tvshows';
export type ListType = 'popular' | 'nowPlaying';

type ListItem = {
    data: Promise<Media[]>;
    title: string;
};

interface HomePageProps {
    searchParams: { [key: string]: string };
}

export default async function HomePage({
    searchParams,
}: HomePageProps): Promise<ReactNode> {
    const session = await getSession();
    const collection = (searchParams.collection as CollectionType) ?? 'movies';
    const listType = (searchParams.listType as ListType) ?? 'nowPlaying';

    const MediaData: Record<CollectionType, Record<ListType, ListItem>> = {
        movies: {
            popular: {
                data: getPopularMovies(),
                title: 'Popular Movies',
            },
            nowPlaying: {
                data: getLatestMovies(),
                title: 'Latest Movies',
            },
        },
        tvshows: {
            popular: {
                data: getPopularShows(session?.locale ?? ''),
                title: 'Popular TV Shows',
            },
            nowPlaying: {
                data: getAiringTodayShows(session?.locale ?? ''),
                title: 'Airing Today TV Shows',
            },
        },
    };

    return (
        <>
            <div>
                <Hero />
                <HomeSubNav />
            </div>
            <MediaList
                medias={await MediaData[collection][listType].data}
                title={MediaData[collection][listType].title}
            />
        </>
    );
}
