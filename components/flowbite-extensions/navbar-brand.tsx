'use client';
import { NavbarBrand as FBNavbarBrand, NavbarBrandProps } from 'flowbite-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export const NavbarBrand = ({
    href,
    children,
}: NavbarBrandProps): ReactNode => {
    return (
        <FBNavbarBrand as={Link} href={href}>
            {children}
        </FBNavbarBrand>
    );
};
