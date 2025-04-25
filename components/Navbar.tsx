import {
    Navbar as FBNavbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';
import { CustomFlowbiteTheme } from 'flowbite-react/types';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { IoHome, IoSearch } from 'react-icons/io5';

const navbarTheme: CustomFlowbiteTheme['navbar'] = {
    root: {
        base: 'bg-neutral font-bold text-standard p-4 drop-shadow-2xl md:text-2xl',
    },
    link: {
        base: 'text-xl py-2 px-3',
        active: {
            on: 'bg-primary-hover',
            off: 'text-standard border-b md:border-0',
        },
    },
    toggle: {
        base: 'inline-flex items-center rounded-lg p-2 text-md text-standard focus:outline-hidden md:hidden',
        icon: 'h-6 w-6 shrink-0',
    },
};

export const Navbar = (): ReactNode => {
    return (
        <FBNavbar theme={navbarTheme} applyTheme="replace">
            <NavbarBrand href="/" as={Link}>
                Movies & Series Lookup
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink
                    className="flex flex-row items-center gap-1.5 md:hidden"
                    href="/"
                    as={Link}
                >
                    <IoHome /> Home
                </NavbarLink>
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
