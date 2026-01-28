import React, { ReactNode } from 'react';
import { ServiceWorkerProvider } from '@/components/providers/service-worker-provider';
import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

interface ProvidersProps {
    children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps): ReactNode => {
    return (
        <>
            <SessionProvider />
            <ServiceWorkerProvider />
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </>
    );
};
