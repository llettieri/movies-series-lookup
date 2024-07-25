'use client';

import { ReactNode, useEffect } from 'react';

export const ServiceWorker = (): ReactNode => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    });

    return <></>;
};
