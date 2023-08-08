import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export type CardSize = 'normal' | 'small';

interface CardBaseProps {
    link: string;
    image: string;
    children: ReactElement;
    size: CardSize;
}

export default function CardBase({
    link,
    image,
    children,
    size,
}: CardBaseProps): ReactElement {
    if (size === 'normal') {
        return (
            <Link
                href={link}
                className="flex h-full w-48 cursor-pointer flex-col rounded-md bg-primary shadow-sm transition-transform duration-150 md:hover:scale-105 md:hover:drop-shadow-lg"
                prefetch={true}
            >
                <Image
                    src={image}
                    width={200}
                    height={300}
                    alt=""
                    className="rounded-t-md"
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    loading="lazy"
                />
                {children}
            </Link>
        );
    } else {
        return (
            <Link
                href={link}
                className="flex h-full flex-row items-center rounded-md bg-primary shadow-sm transition-transform duration-150 md:hover:scale-105 md:hover:drop-shadow-lg"
                prefetch={true}
            >
                <Image
                    src={image}
                    width={70}
                    height={70}
                    alt=""
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    loading="lazy"
                    className="my-2 ml-2 max-h-24 rounded-md"
                />
                <div className="mx-4 my-2">{children}</div>
            </Link>
        );
    }
}
