'use client';
import { NavbarLink as FBNavbarLink, NavbarLinkProps } from 'flowbite-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export const NavbarLink = ({
    href,
    children,
    className,
}: NavbarLinkProps): ReactNode => {
    return (
        <FBNavbarLink as={Link} href={href} className={className}>
            {children}
        </FBNavbarLink>
    );
};
