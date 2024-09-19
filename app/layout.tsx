import './globals.css';

import { Footer } from '@/components/Footer';
import Loading from '@/components/Loading';
import { Meta } from '@/components/Meta';
import { Navbar } from '@/components/Navbar';
import { ServiceWorker } from '@/components/ServiceWorker';
import { SessionProvider } from '@/components/SessionProvider';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import React, { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = Meta({});
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
    return (
        <html lang="en">
            <body className={`${inter.className} overflow-hidden`}>
                <SessionProvider />
                <ServiceWorker />
                <div className="flex h-dvh flex-col overflow-hidden">
                    <Navbar />

                    <div className="flex flex-1 flex-col overflow-auto overscroll-y-none">
                        <main className="flex-1 bg-base100 p-5 sm:p-10">
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
