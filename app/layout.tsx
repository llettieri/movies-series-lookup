import './globals.css';

import { Footer } from '@/components/Footer';
import Loading from '@/components/Loading';
import { Meta } from '@/components/Meta';
import { NavBar } from '@/components/NavBar';
import { ServiceWorker } from '@/components/ServiceWorker';
import { SessionProvider } from '@/components/SessionProvider';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import React, { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = Meta({});
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}): ReactNode {
    return (
        <html lang="en">
            <body className={`${inter.className} overflow-hidden`}>
                <SessionProvider />
                <ServiceWorker />
                <div className="flex h-screen flex-col overflow-hidden">
                    <NavBar />

                    <div className="flex flex-1 flex-col overflow-auto overscroll-y-none">
                        <main className="flex-1 bg-base100">
                            <Suspense fallback={<Loading />}>
                                {children}
                            </Suspense>
                        </main>
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
