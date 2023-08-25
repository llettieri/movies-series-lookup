'use client';

import { CountryProviders } from '@/models/CountryProviders';
import { localGetItem } from '@/storage/Storage';
import { StorageKeys } from '@/storage/StorageKeys';
import { ReactElement } from 'react';

interface WatchProvidersProps {
    providers: Map<string, CountryProviders>;
}

export const WatchProviders = ({
    providers,
}: WatchProvidersProps): ReactElement => {
    const region = localGetItem<string>(StorageKeys.REGION);
    const localProviders = providers.get(region);

    return (
        <a href={localProviders?.link}>
            {localProviders?.buy?.map((p) => <h1 key={p.id}>{p.name}</h1>)}
            {localProviders?.free?.map((p) => <h1 key={p.id}>{p.name}</h1>)}
            {localProviders?.flatrate?.map((p) => <h1 key={p.id}>{p.name}</h1>)}
        </a>
    );
};
