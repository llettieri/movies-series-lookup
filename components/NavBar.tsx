import { Icon } from '@/icons/Icon';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export const NavBar = (): ReactElement => {
    return (
        <nav className="bg-navbar drop-shadow-2xl">
            <div className="container mx-auto flex max-w-7xl justify-between p-4 font-bold tracking-widest text-neutral-100">
                <Link
                    className="text-base transition-transform duration-100 hover:scale-110 md:text-2xl"
                    href="/"
                >
                    Movie & Series Lookup
                </Link>
                <Link
                    href="/search"
                    className="flex items-center gap-3 transition-transform duration-100 hover:scale-110"
                >
                    <Icon icon="SEARCH" width={25} />
                    <p className="align-middle leading-8">Search</p>
                </Link>
            </div>
        </nav>
    );
};
