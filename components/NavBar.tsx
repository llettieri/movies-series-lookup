import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function NavBar(): ReactElement {
    return (
        <nav className="bg-navbar drop-shadow-2xl">
            <div className="font-bold text-neutral-100 p-4 max-w-7xl mx-auto container tracking-widest flex justify-between">
                <Link className="text-base md:text-2xl" href="/">
                    Movie & Series Lookup
                </Link>
                <Link href="/search" className="flex gap-3">
                    <Image
                        width={30}
                        height={30}
                        src={'/search_icon.svg'}
                        alt="Search"
                    />
                    <p className="align-middle">Search</p>
                </Link>
            </div>
        </nav>
    );
}
