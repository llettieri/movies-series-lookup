import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const updateSearchParams = (
    key: string,
    value: string,
    router: AppRouterInstance,
    currentSearchParams: ReadonlyURLSearchParams,
): void => {
    const params = new URLSearchParams(currentSearchParams);
    params.set(key, value);

    router.replace(`?${params}`, { scroll: false });
};
