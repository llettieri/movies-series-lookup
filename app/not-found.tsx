import { Meta } from '@/components/meta';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
            <Button asChild className="mx-auto w-64">
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    );
}
