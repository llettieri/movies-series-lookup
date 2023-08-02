import './globals.css';

import Footer from '@/components/Footer';
import { Meta } from '@/components/Meta';
import NavBar from '@/components/NavBar';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = Meta({});

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}): ReactNode {
    return (
        <html lang="en">
            <body className={`${inter.className} overflow-hidden`}>
                <div className="flex flex-col h-screen overflow-hidden">
                    <NavBar />

                    <div className="flex flex-col flex-1 overflow-auto">
                        <main className="flex-1 bg-mainBackground">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}