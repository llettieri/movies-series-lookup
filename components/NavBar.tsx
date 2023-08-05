import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function NavBar(): ReactElement {
    return (
        <nav className="bg-navbar drop-shadow-2xl">
            <div className="font-bold text-neutral-100 p-4 max-w-7xl mx-auto container tracking-widest flex justify-between">
                <Link
                    className="text-base md:text-2xl transition-transform duration-100 hover:scale-110"
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
