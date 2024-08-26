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
            {/* <FooterLinkGroup>
                <FooterLink href="#">Imprint</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
            </FooterLinkGroup>*/}
        </FBFooter>
    );
};
