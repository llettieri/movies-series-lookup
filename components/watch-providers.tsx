import React, { ReactNode } from 'react';
import CompanyLogo from '@/components/company-logo';
import { getLocale } from '@/services/session-service';
import {
    getTVShowSeasonWatchProviders,
    getTVShowWatchProviders,
} from '@/services/tv-show-service';
import { ProviderGroup } from '@/models/provider-group';
import { getMovieWatchProviders } from '@/services/movie-service';
import { MediaItemType } from '@/models/base';

const mediaProvidersMap: Record<
    MediaItemType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]) => Promise<ProviderGroup | undefined>
> = {
    show: (mediaId: string, locale: string) =>
        getTVShowWatchProviders(mediaId, locale),
    showSeason: (mediaId: string, locale: string, seasonNumber: number) =>
        getTVShowSeasonWatchProviders(mediaId, seasonNumber, locale),
    showSeasonEpisode: () => new Promise(() => undefined),
    movie: (mediaId: string, locale: string) =>
        getMovieWatchProviders(mediaId, locale),
};

interface WatchProvidersProps {
    mediaId: string;
    seasonNumber?: number;
    type: MediaItemType;
}

export const WatchProviders = async ({
    mediaId,
    seasonNumber,
    type,
}: WatchProvidersProps): Promise<ReactNode> => {
    const locale = await getLocale();
    const providerGroup = await mediaProvidersMap[type](
        mediaId,
        locale,
        seasonNumber,
    );

    if (!providerGroup) {
        return null;
    }

    return (
        <div id="watch-providers" className="mt-4 w-full">
            <div className="flex flex-wrap items-center gap-4 align-middle">
                <p className="text-md w-auto">Watch Providers: </p>
                <div className="flex flex-wrap gap-4">
                    {providerGroup.providers.map(({ id, logo, name }) => (
                        <CompanyLogo
                            key={id}
                            image={logo}
                            alt={name}
                            externalLink={providerGroup.link}
                        />
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
