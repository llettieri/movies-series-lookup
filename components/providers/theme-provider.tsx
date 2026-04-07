'use client';

import * as React from 'react';
import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = ({
    children,
}: React.ComponentProps<typeof NextThemesProvider>): ReactNode => (
    <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
    >
        {children}
    </NextThemesProvider>
);
