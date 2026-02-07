import React, { ReactNode } from 'react';
import CompanyLogo from '@/components/company-logo';
import { getLocale } from '@/services/session-service';
import { getTVShowWatchProviders } from '@/services/tv-show-service';
import { MediaType } from '@/models/media-type';
import { ProviderGroup } from '@/models/provider-group';
import { getMovieWatchProviders } from '@/services/movie-service';

const mediaProvidersMap: Record<
    MediaType,
    (mediaId: string, locale: string) => Promise<ProviderGroup | undefined>
> = {
    tv: (mediaId, locale) => getTVShowWatchProviders(mediaId, locale),
    movie: (mediaId, locale) => getMovieWatchProviders(mediaId, locale),
    person: () => new Promise(() => undefined),
};

interface WatchProvidersProps {
    mediaId: string;
    mediaType: MediaType;
}

export const WatchProviders = async ({
    mediaId,
    mediaType,
}: WatchProvidersProps): Promise<ReactNode> => {
    const locale = await getLocale();
    const providerGroup = await mediaProvidersMap[mediaType](mediaId, locale);

    if (!providerGroup) {
        return null;
    }

    return (
        <div id="watch-providers" className="mt-4 w-full">
            <div className="flex flex-wrap items-center gap-4 align-middle">
                <p className="text-md w-auto">Watch Providers: </p>
                <div className="flex gap-4">
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
