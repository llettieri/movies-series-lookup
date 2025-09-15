'use client';

import { Card } from 'flowbite-react';
import { CustomFlowbiteTheme } from 'flowbite-react/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export type CardSize = 'normal' | 'small';

interface CardBaseProps {
    link: string;
    image?: string;
    alt: string;
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
    alt,
    children,
    size,
}: CardBaseProps): ReactNode => {
    if (size === 'normal') {
        return (
            <Link href={link}>
                <Card
                    renderImage={() => (
                        <Image
                            src={image ?? '/fallback.png'}
                            alt={alt}
                            width={200}
                            height={300}
                            className="rounded-t-md"
                        />
                    )}
                    theme={normalCardTheme}
                    applyTheme={'replace'}
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
                            src={image ?? ''}
                            alt={alt}
                            width={100}
                            height={100}
                            className="h-full max-h-24 w-24 shrink-0 rounded-l-md object-cover"
                        />
                    )}
                    theme={smallCardTheme}
                    applyTheme={'replace'}
                    horizontal
                >
                    {children}
                </Card>
            </Link>
        );
    }
};
