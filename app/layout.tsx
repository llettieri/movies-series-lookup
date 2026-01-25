import './globals.css';

import { Footer } from '@/components/footer';
import Loading from '@/components/loading';
import { Meta } from '@/components/meta';
import { NavigationBar } from '@/components/navigation-bar';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import React, { ReactNode, Suspense } from 'react';
import { Providers } from '@/components/providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = Meta({});
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<'/'>): ReactNode {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    <div className="flex h-dvh flex-col overflow-hidden">
                        <NavigationBar />

                        <div className="flex flex-1 flex-col overflow-auto overscroll-y-none">
                            <main className="bg-background flex-1 p-5 sm:p-10">
                                <Suspense fallback={<Loading />}>
                                    {children}
                                </Suspense>
                            </main>
                            <Footer />
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
