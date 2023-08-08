import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function NavBar(): ReactElement {
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
                    className="flex gap-3 transition-transform duration-100 hover:scale-110"
                >
                    <Image
                        width={30}
                        height={30}
                        src={'/search_icon.svg'}
                        alt="Search Icon"
                    />
                    <p className="align-middle leading-8">Search</p>
                </Link>
            </div>
        </nav>
    );
}
