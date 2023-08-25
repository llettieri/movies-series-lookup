import { Icon } from '@/icons/Icon';
import { TIcons } from '@/icons/Icons';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface ButtonProps {
    className?: string;
    icon?: TIcons;
    iconSize?: number;
    link?: string;
    onClick?: () => void;
    title: string;
    type?: 'submit' | 'reset' | 'button';
    variant?: 'default' | 'icon';
}

export const Button = ({
    title,
    onClick,
    type,
    className,
    link,
    variant = 'default',
    icon,
    iconSize,
}: ButtonProps): ReactElement => {
    const variants = {
        default: link ? (
            <Link href={link} prefetch={true}>
                {title}
            </Link>
        ) : (
            title
        ),
        icon: icon && <Icon icon={icon} width={iconSize} />,
    };

    return (
        <button
            className={` border-2 border-primaryTint bg-primary py-2 text-primaryText transition-colors duration-300 ease-in-out hover:border-secondaryTint hover:bg-secondary hover:text-black ${
                variant === 'icon' ? 'rounded-full px-2' : 'rounded-md px-3'
            } ${className}`}
            onClick={onClick}
            type={type ?? 'button'}
        >
            {variants[variant]}
        </button>
    );
};
