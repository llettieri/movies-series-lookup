import { Card, CustomFlowbiteTheme } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export type CardSize = 'normal' | 'small';

interface CardBaseProps {
    link: string;
    image: string;
    children: ReactNode;
    size: CardSize;
}

const normalCardTheme: CustomFlowbiteTheme['card'] = {
    root: {
        base: 'flex h-full rounded-md bg-primary shadow-md w-48 cursor-pointer md:hover:scale-105 transition-transform duration-150 md:hover:drop-shadow-lg',
        children: 'flex flex-col h-full',
    },
};

const smallCardTheme: CustomFlowbiteTheme['card'] = {
    root: {
        base: 'flex flex-row h-full items-center rounded-md bg-primary shadow-sm w-48 cursor-pointer md:hover:scale-105 transition-transform duration-150 md:hover:drop-shadow-lg',
        children: 'flex flex-col h-full mx-4 my-2',
        horizontal: {
            on: 'w-full',
        },
    },
};

export const CardBase = ({
    link,
    image,
    children,
    size,
}: CardBaseProps): ReactNode => {
    if (size === 'normal') {
        return (
            <Link href={link}>
                <Card
                    renderImage={() => (
                        <Image
                            src={image}
                            alt=""
                            width={200}
                            height={300}
                            className="rounded-t-md"
                        />
                    )}
                    theme={normalCardTheme}
                >
                    {children}
                </Card>
            </Link>
        );
    } else {
        return (
            <Link href={link}>
                <Card
                    renderImage={() => (
                        <Image
                            src={image}
                            alt=""
                            width={200}
                            height={300}
                            className="h-full max-h-24 w-24 rounded-l-md object-cover"
                        />
                    )}
                    theme={smallCardTheme}
                    horizontal
                >
                    {children}
                </Card>
            </Link>
        );
    }
};
