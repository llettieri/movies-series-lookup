'use client';

import { ReactElement, useEffect } from 'react';

export const ServiceWorker = (): ReactElement => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    });

    return <></>;
};
