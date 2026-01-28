'use client';

import { ReactNode, useEffect } from 'react';

export const ServiceWorkerProvider = (): ReactNode => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    });

    return <></>;
};
