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
        get<GeoDataDto>(routes.country).then((r) =>
            createSession(r.data.countryCode),
        );
    }, []);

    return <></>;
};
