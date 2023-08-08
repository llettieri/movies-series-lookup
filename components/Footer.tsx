import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function Footer(): ReactElement {
    return (
        <div className="flex h-24 flex-shrink-0 items-center justify-center bg-navbar text-center">
            <Link href="https://lore-le.ch" target="_blank">
                <p className="text-xl text-white">
                    &copy; Copyright 2023{' '}
                    <span className="font-bold">Lettieri Lorenzo</span>
                </p>
            </Link>
        </div>
    );
}
