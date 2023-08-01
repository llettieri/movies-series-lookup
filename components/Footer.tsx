import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function Footer(): ReactElement {
    return (
        <div className="bg-navbar flex-shrink-0 text-center h-24 flex items-center justify-center">
            <Link href="https://lore-le.ch" target="_blank">
                <p className="text-xl text-white">
                    &copy; Copyright 2023{' '}
                    <span className="font-bold">Lettieri Lorenzo</span>
                </p>
            </Link>
        </div>
    );
}
