'use client';

import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { localSaveItem } from '@/storage/Storage';
import { StorageKeys } from '@/storage/StorageKeys';
import { ReactElement } from 'react';

interface GeoDataDto {
    region: string;
    country: string;
    countryCode: string;
}

export const GeoInfo = (): ReactElement => {
    if (typeof window !== 'undefined') {
        api()
            .get<GeoDataDto>(routes.country)
            .then((r) => localSaveItem(StorageKeys.REGION, r.data.countryCode));
    }

    return <></>;
};
