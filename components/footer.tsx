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
        <FBFooter container className="bg-neutral rounded-none">
            <div className="container mx-auto flex flex-row justify-between text-center *:text-lg *:text-white">
                <FooterLinkGroup>
                    <FooterLink href="/imprint">Imprint</FooterLink>
                    <FooterLink href="/privacy">Privacy Policy</FooterLink>
                </FooterLinkGroup>
                <FooterCopyright
                    href="https://lore-le.ch"
                    by="Lettieri Lorenzo"
                    year={currentYear}
                />
            </div>
        </FBFooter>
    );
};
