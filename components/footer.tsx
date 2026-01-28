import dayjs from 'dayjs';
import React, { ReactNode } from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

interface LinkProps {
    href: string;
    title: string;
}

const links: LinkProps[] = [
    {
        title: 'Imprint',
        href: '/imprint',
    },
    {
        title: 'Privacy Policy',
        href: '/privacy',
    },
];

export const Footer = (): ReactNode => {
    const currentYear = dayjs().year();

    return (
        <footer className="bg-muted p-6">
            <div className="container mx-auto">
                <NavigationMenu className="flex max-w-full items-center justify-between">
                    <NavigationMenuList className="flex-col items-start gap-2 md:flex-row md:gap-4">
                        {links.map((link) => (
                            <NavigationMenuItem key={link.href}>
                                <NavigationMenuLink
                                    asChild
                                    className="p-0 text-lg"
                                >
                                    <Link href={link.href}>{link.title}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                    <NavigationMenuList>
                        <NavigationMenuItem className="flex">
                            <NavigationMenuLink
                                asChild
                                className="p-0 text-center text-lg md:flex-row md:text-start"
                            >
                                <Link
                                    href="https://lore-le.ch"
                                    referrerPolicy="origin"
                                    target="_blank"
                                >
                                    &copy; {currentYear}{' '}
                                    <span>Lettieri Lorenzo</span>
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </footer>
    );
};
