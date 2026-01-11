import dayjs from 'dayjs';
import {
    Footer as FBFooter,
    FooterCopyright,
    FooterLinkGroup,
} from 'flowbite-react';
import React, { ReactNode } from 'react';
import { FooterLink } from '@/components/flowbite-extensions/footer-link';

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
