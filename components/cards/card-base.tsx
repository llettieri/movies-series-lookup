'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { FALLBACK_IMAGE, TMDBImage } from '@/components/image';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export type CardSize = 'normal' | 'small';

interface CardBaseProps {
    link: string;
    image?: string;
    alt: string;
    children: ReactNode;
    size: CardSize;
}

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
                <Card className="md:hover:drop-s h-full w-48 transition-transform duration-150 md:hover:scale-105">
                    <AspectRatio ratio={2 / 3}>
                        <TMDBImage
                            src={image ?? FALLBACK_IMAGE}
                            alt={alt}
                            className="object-cover"
                            scope="poster"
                            fill
                            sizes="(min-width: 48rem) 31.25rem, 11.563rem"
                        />
                    </AspectRatio>
                    <div className="flex h-full flex-col justify-between gap-3 py-2">
                        {children}
                    </div>
                </Card>
            </Link>
        );
    } else {
        return (
            <Link href={link}>
                <Card className="flex-row items-center transition-transform duration-150 md:hover:scale-105 md:hover:drop-shadow-lg">
                    <div className="h-full w-30 shrink-0">
                        <AspectRatio ratio={1 / 1}>
                            <TMDBImage
                                src={image ?? FALLBACK_IMAGE}
                                alt={alt}
                                className="object-cover"
                                scope="profile"
                                fill
                                sizes="(min-width: 48rem) 154px, 92px"
                            />
                        </AspectRatio>
                    </div>
                    <div className="mx-4 my-2 flex w-full flex-col">
                        {children}
                    </div>
                </Card>
            </Link>
        );
    }
};
