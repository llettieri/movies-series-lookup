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
import React, { ReactNode, Suspense } from 'react';
import { SkeletonList } from '@/components/skeletons/skeleton-list';

export type CollectionType = 'movies' | 'tvshows';
export type ListType = 'popular' | 'nowPlaying';

type ListItem = {
    data: Promise<Media[]>;
    title: string;
};

type SearchParams = {
    collection: CollectionType | undefined;
    listType: ListType | undefined;
};

export default async function HomePage({
    searchParams,
}: PageProps<'/'>): Promise<ReactNode> {
    const locale = await getLocale();
    const searchParamsList = (await searchParams) as SearchParams;
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
    const title = MediaData[collection][listType].title;

    return (
        <>
            <Hero />
            <HomeSubNavigation />
            <Suspense fallback={<SkeletonList title={title} />}>
                <MediaList
                    title={title}
                    mediaCallback={() => MediaData[collection][listType].data}
                />
            </Suspense>
        </>
    );
}
