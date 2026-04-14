import React, { ReactNode } from 'react';
import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Search } from 'lucide-react';

const NavigationBar = (): ReactNode => {
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
                            <NavigationMenuLink asChild className="text-xl">
                                <Link href="/search">
                                    <div className="flex flex-row items-center gap-1">
                                        <Search className="size-6 flex-1 md:size-[1em]" />
                                        <span className="hidden sm:inline">
                                            Search
                                        </span>
                                    </div>
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuIndicator />
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
};

export { NavigationBar };
