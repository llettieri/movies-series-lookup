import React, { ReactNode } from 'react';
import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Search } from 'lucide-react';

export const NavigationBar = (): ReactNode => {
    return (
        <div className="bg-muted p-4 drop-shadow-2xl">
            <div className="container mx-auto">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className="text-md font-bold md:text-2xl"
                            >
                                <Link href="/">Movies & Series Lookup</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuIndicator />
                    </NavigationMenuList>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className="flex-row items-center text-xl"
                            >
                                <Link href="/search">
                                    <Search className="size-6 flex-1 md:size-[1em]" />
                                    <span className="hidden sm:inline">
                                        Search
                                    </span>
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuIndicator />
                    </NavigationMenuList>

                    <NavigationMenuViewport />
                </NavigationMenu>
            </div>
        </div>
    );
};
