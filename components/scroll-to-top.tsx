'use client';
import { ReactNode, useEffect } from 'react';

/**
 * This component should only exist until the weird scroll behavior of the next/Link component is fixed.
 * Check the changelog for possible fix!
 *
 * TODO: Remove in a later state
 */
export const ScrollToTop = (): ReactNode => {
    useEffect(() => {
        const container = document.getElementById('scrollable-content');
        container?.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return null;
};
