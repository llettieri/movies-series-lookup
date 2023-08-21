'use client';

import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { localSaveItem } from '@/app/api/config/Storage';
import { StorageKeys } from '@/app/api/config/StorageKeys';
import { ReactElement } from 'react';

export const GeoInfo = (): ReactElement => {
    api()
        .get<string>(routes.country)
        .then((r) => localSaveItem(StorageKeys.REGION, r.data));

    return <></>;
};
