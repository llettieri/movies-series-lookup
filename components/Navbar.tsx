import {
    CustomFlowbiteTheme,
    Navbar as FBNavbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { IoSearch } from 'react-icons/io5';

const navbarTheme: CustomFlowbiteTheme['navbar'] = {
    root: {
        base: 'bg-neutral font-bold text-primaryText p-4 drop-shadow-2xl md:text-2xl',
    },
    link: {
        base: 'text-xl py-2 px-3',
        active: {
            on: 'bg-primaryHover',
            off: 'text-primaryText border-b md:border-0',
        },
    },
    toggle: {
        base: 'inline-flex items-center rounded-lg p-2 text-md text-primaryText focus:outline-none md:hidden',
        icon: 'h-6 w-6 shrink-0',
    },
};

export const Navbar = (): ReactNode => {
    return (
        <FBNavbar theme={navbarTheme}>
            <NavbarBrand href="/" as={Link}>
                Movies & Series Lookup
            </NavbarBrand>
            <NavbarToggle />
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
