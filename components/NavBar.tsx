import { Icon } from '@/icons/Icon';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export const NavBar = (): ReactElement => {
    return (
        <nav className="bg-neutral drop-shadow-2xl">
            <div className="container mx-auto flex max-w-7xl justify-between p-4 font-bold tracking-widest text-neutral-100">
                <Link className="text-base" href="/">
                    <button className="btn btn-ghost md:text-2xl">
                        Movies & Series Lookup
                    </button>
                </Link>

                <Link href="/search">
                    <button type="button" className="btn btn-ghost md:text-2xl">
                        <Icon icon="SEARCH" width={25} />
                        Search
                    </button>
                </Link>
            </div>
        </nav>
    );
};
