import dayjs from 'dayjs';
import { Footer as FBFooter, FooterCopyright } from 'flowbite-react';
import React, { ReactNode } from 'react';

export const Footer = (): ReactNode => {
    const currentYear = dayjs().year();
    return (
        <FBFooter container className="rounded-none bg-neutral *:text-white">
            <FooterCopyright
                href="https://lore-le.ch"
                by="Lettieri Lorenzo"
                year={currentYear}
            />
            {/*
             TODO add these pages in ticket: https://github.com/llettieri/movies-series-lookup/issues/5
             <FooterLinkGroup>
                <FooterLink href="/imprint">Imprint</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </FooterLinkGroup>*/}
        </FBFooter>
    );
};
