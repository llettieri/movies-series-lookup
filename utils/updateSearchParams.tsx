import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const updateSearchParams = (
    router: AppRouterInstance,
    currentSearchParams: ReadonlyURLSearchParams,
    ...queryParams: [string, string][]
): void => {
    const params = new URLSearchParams(currentSearchParams);
    queryParams.forEach(([key, value]) => params.set(key, value));

    const newUrl = `?${params}`;
    router.replace(newUrl, { scroll: false });
};
