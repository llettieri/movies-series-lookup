'use client';

import { Card } from 'flowbite-react';
import { CustomFlowbiteTheme } from 'flowbite-react/types';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { FALLBACK_IMAGE, TMDBImage } from '@/components/image';

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
                        <TMDBImage
                            src={image ?? FALLBACK_IMAGE}
                            alt={alt}
                            className="rounded-t-md"
                            width={200}
                            height={300}
                            scope="poster"
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
                        <TMDBImage
                            src={image ?? ''}
                            alt={alt}
                            width={200}
                            height={200}
                            className="h-full max-h-24 w-24 shrink-0 rounded-l-md object-cover"
                            scope="profile"
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
