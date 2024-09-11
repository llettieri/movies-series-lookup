import dayjs from 'dayjs';
import {
    Footer as FBFooter,
    FooterCopyright,
    FooterLink,
    FooterLinkGroup,
} from 'flowbite-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export const Footer = (): ReactNode => {
    const currentYear = dayjs().year();
    return (
        <FBFooter container className="rounded-none bg-neutral *:text-white">
            <FooterLinkGroup>
                <FooterLink as={Link} href="/imprint">
                    Imprint
                </FooterLink>
                <FooterLink as={Link} href="/privacy">
                    Privacy Policy
                </FooterLink>
            </FooterLinkGroup>
            <FooterCopyright
                href="https://lore-le.ch"
                by="Lettieri Lorenzo"
                year={currentYear}
            />
        </FBFooter>
    );
};
