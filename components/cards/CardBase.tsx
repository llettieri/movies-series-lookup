import { Card, CustomFlowbiteTheme } from 'flowbite-react';
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
        base: 'flex h-full rounded-md bg-primary shadow-md w-48 cursor-pointer',
        href: 'md:hover:scale-105 transition-transform duration-150 md:hover:drop-shadow-lg',
        children: 'flex flex-col h-full',
    },
};

const smallCardTheme: CustomFlowbiteTheme['card'] = {
    root: {
        base: 'flex flex-row h-full items-center rounded-md bg-primary shadow-sm w-48 cursor-pointer',
        href: 'md:hover:scale-105 transition-transform duration-150 md:hover:drop-shadow-lg',
        children: 'flex flex-col h-full mx-4 my-2',
        horizontal: {
            on: 'w-full',
        },
    },
    img: {
        horizontal: {
            off: 'rounded-t-lg',
            on: 'h-full w-24 rounded-l-md object-cover max-h-24',
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
            <Card href={link} imgSrc={image} theme={normalCardTheme}>
                {children}
            </Card>
        );
    } else {
        return (
            <Card href={link} imgSrc={image} theme={smallCardTheme} horizontal>
                {children}
            </Card>
        );
    }
};
