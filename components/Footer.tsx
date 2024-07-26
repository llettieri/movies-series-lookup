import Link from 'next/link';
import React, { ReactNode } from 'react';

export const Footer = (): ReactNode => {
    return (
        <div className="flex h-24 flex-shrink-0 items-center justify-center bg-neutral text-center">
            <Link href="https://lore-le.ch" target="_blank">
                <p className="text-xl text-white">
                    &copy; Copyright 2024{' '}
                    <span className="font-bold">Lettieri Lorenzo</span>
                </p>
            </Link>
        </div>
    );
};
