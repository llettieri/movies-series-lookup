import {
    CustomFlowbiteTheme,
    Navbar as FBNavbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
} from 'flowbite-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { IoSearch } from 'react-icons/io5';

const navbarTheme: CustomFlowbiteTheme['navbar'] = {
    root: {
        base: 'bg-neutral font-bold text-primaryText p-4 drop-shadow-2xl md:text-2xl',
    },
    link: {
        base: 'text-xl',
        active: {
            off: 'text-primaryText',
        },
    },
};

export const Navbar = (): ReactNode => {
    return (
        <FBNavbar theme={navbarTheme}>
            <NavbarBrand href="/" as={Link}>
                Movies & Series Lookup
            </NavbarBrand>
            <NavbarCollapse>
                <NavbarLink
                    className="flex flex-row items-center gap-1.5"
                    href="/search"
                    as={Link}
                >
                    <IoSearch /> Search
                </NavbarLink>
            </NavbarCollapse>
        </FBNavbar>
    );
};
