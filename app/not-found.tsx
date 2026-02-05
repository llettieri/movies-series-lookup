import { Meta } from '@/components/meta';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { GoBackButton } from '@/components/go-back-button';

export const metadata: Metadata = Meta({ title: 'Page not found!' });

export default function NotFound(): ReactNode {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-20 py-16">
            <Image
                className="mx-auto block"
                src="/not_found.svg"
                width={500}
                height={250}
                alt="404 Not found!"
            />
            <span>
                It looks like you&#39;re searching for something, that
                doesn&#39;t exist...
            </span>
            <GoBackButton />
        </div>
    );
}
