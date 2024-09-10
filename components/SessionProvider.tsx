'use client';

import { routes } from '@/config/routes';
import { get } from '@/services/AxiosService';
import { createSession } from '@/services/SessionService';
import { ReactNode, useEffect } from 'react';

interface GeoDataDto {
    region: string;
    country: string;
    countryCode: string;
}

export const SessionProvider = (): ReactNode => {
    useEffect(() => {
        get<GeoDataDto>(routes.country)
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
