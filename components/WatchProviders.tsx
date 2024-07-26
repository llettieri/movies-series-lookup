import { ProviderGroup } from '@/models/ProviderGroup';
import { getSession } from '@/services/SessionService';
import { ReactNode } from 'react';

interface WatchProvidersProps {
    providers: Map<string, ProviderGroup>;
}

export const WatchProviders = async ({
    providers,
}: WatchProvidersProps): Promise<ReactNode> => {
    const session = await getSession();
    const localProviders = providers.get(session?.locale ?? 'CH');

    return (
        <a href={localProviders?.link}>
            {localProviders?.buy?.map((p) => <h1 key={p.id}>{p.name}</h1>)}
            {localProviders?.free?.map((p) => <h1 key={p.id}>{p.name}</h1>)}
            {localProviders?.flatrate?.map((p) => <h1 key={p.id}>{p.name}</h1>)}
        </a>
    );
};
