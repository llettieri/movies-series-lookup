'use client';

import { routes } from '@/config/routes';
import { useAxios } from '@/hooks/useAxios';
import { localSaveItem } from '@/storage/Storage';
import { StorageKeys } from '@/storage/StorageKeys';
import { ReactElement } from 'react';

interface GeoDataDto {
    region: string;
    country: string;
    countryCode: string;
}

export const GeoInfo = (): ReactElement => {
    const axios = useAxios();

    if (typeof window !== 'undefined') {
        axios
            .get<GeoDataDto>(routes.country)
            .then((r) => localSaveItem(StorageKeys.REGION, r.data.countryCode));
    }

    return <></>;
};
