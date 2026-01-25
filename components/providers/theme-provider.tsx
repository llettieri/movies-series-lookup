'use client';

import * as React from 'react';
import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = ({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>): ReactNode => (
    <NextThemesProvider {...props}>{children}</NextThemesProvider>
);
