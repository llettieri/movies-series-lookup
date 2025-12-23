import { Hero } from '@/components/hero';
import { HomeSubNavigation } from '@/components/home-sub-navigation';
import { MediaList } from '@/components/lists/media-list';
import { Media } from '@/models/media';
import { getLatestMovies, getPopularMovies } from '@/services/movie-service';
import { getLocale } from '@/services/session-service';
import {
    getAiringTodayShows,
    getPopularShows,
} from '@/services/tv-show-service';
import React, { ReactNode } from 'react';

export type CollectionType = 'movies' | 'tvshows';
export type ListType = 'popular' | 'nowPlaying';

type ListItem = {
    data: Promise<Media[]>;
    title: string;
};

interface HomePageProps {
    searchParams: Promise<{
        collection: CollectionType | undefined;
        listType: ListType | undefined;
    }>;
}

export default async function HomePage({
    searchParams,
}: HomePageProps): Promise<ReactNode> {
    const locale = await getLocale();
    const searchParamsList = await searchParams;
    const collection = searchParamsList.collection ?? 'movies';
    const listType = searchParamsList.listType ?? 'nowPlaying';

    const MediaData: Record<CollectionType, Record<ListType, ListItem>> = {
        movies: {
            popular: {
                data: getPopularMovies(locale),
                title: 'Popular Movies',
            },
            nowPlaying: {
                data: getLatestMovies(locale),
                title: 'Latest Movies',
            },
        },
        tvshows: {
            popular: {
                data: getPopularShows(locale),
                title: 'Popular TV Shows',
            },
            nowPlaying: {
                data: getAiringTodayShows(locale),
                title: 'Airing Today TV Shows',
            },
        },
    };

    return (
        <>
            <div>
                <Hero />
                <HomeSubNavigation />
            </div>
            <MediaList
                medias={await MediaData[collection][listType].data}
                title={MediaData[collection][listType].title}
            />
        </>
    );
}
