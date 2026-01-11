'use client';
import { FooterLink as FBFooterLink, FooterLinkProps } from 'flowbite-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export const FooterLink = ({ href, children }: FooterLinkProps): ReactNode => {
    return (
        <FBFooterLink as={Link} href={href}>
            {children}
        </FBFooterLink>
    );
};
