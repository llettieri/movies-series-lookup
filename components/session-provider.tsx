'use client';

import { apiRoutes } from '@/config/api-routes';
import { TMDBApi } from '@/services/api';
import { createSession } from '@/services/session-service';
import { ReactNode, useEffect } from 'react';

interface GeoDataDto {
    region: string;
    country: string;
    countryCode: string;
}

export const SessionProvider = (): ReactNode => {
    useEffect(() => {
        TMDBApi.get<GeoDataDto>(apiRoutes.country)
            .then((r) => createSession(r.data.countryCode))
            .catch((e) => {
                // eslint-disable-next-line
                console.error(
                    'Something went wrong with checking your location: %s',
                    e,
                );
                return createSession('US');
            });
    }, []);

    return <></>;
};
