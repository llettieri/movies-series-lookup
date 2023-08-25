'use client';

import { ReactElement, useEffect } from 'react';

/* eslint-disable no-console */
export const ServiceWorker = (): ReactElement => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    });

    return <></>;
};
