import { Button } from '@/components/Button';
import { Meta } from '@/components/Meta';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode } from 'react';

export const metadata: Metadata = Meta({ title: 'Page not found!' });

export default function NotFound(): ReactNode {
    return (
        <div className="flex flex-col gap-20 py-16">
            <Image
                className="mx-auto block"
                src="/notfound.svg"
                width={500}
                height={250}
                alt="404 Not found!"
            />
            <Button title="Return to Home" link="/" className="w-64 mx-auto" />
        </div>
    );
}
