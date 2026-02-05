'use client';

import { apiRoutes } from '@/config/api-routes';
import { TMDBApi } from '@/services/api';
import { createSession } from '@/services/session-service';
import { ReactNode, useEffect } from 'react';
import { HttpStatusCode } from 'axios';

const FALLBACK_COUNTRY_CODE = 'US';

interface GeoDataDto {
    region: string;
    country: string;
    countryCode: string;
}

export const SessionProvider = (): ReactNode => {
    useEffect(() => {
        TMDBApi.get<GeoDataDto>(apiRoutes.country)
            .then((r) => {
                let countryCode = FALLBACK_COUNTRY_CODE;

                if (r?.status === HttpStatusCode.Ok) {
                    countryCode = r.data.countryCode;
                }

                return createSession(countryCode);
            })
            .catch((e) => {
                // eslint-disable-next-line
                console.error(
                    'Something went wrong with checking your location: %s',
                    e,
                );
                return createSession(FALLBACK_COUNTRY_CODE);
            });
    }, []);

    return <></>;
};
