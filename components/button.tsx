import { Button as FBButton } from 'flowbite-react';
import Link from 'next/link';
import React, { ReactElement, ReactNode } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
    className?: string;
    icon?: ReactElement<IconType>;
    link?: string;
    onClick?: () => void;
    title: string;
    type?: 'submit' | 'reset' | 'button';
    variant?: 'default' | 'icon';
}

export const Button = ({
    title,
    onClick,
    type = 'button',
    className,
    link,
    variant = 'default',
    icon,
}: ButtonProps): ReactNode => {
    const variants = {
        default: title,
        icon,
    };

    return (
        <FBButton
            className={`bg-primary hover:bg-primary-hover cursor-pointer outline-hidden focus:ring-0 ${className}`}
            pill={variant === 'icon'}
            onClick={onClick}
            type={type}
            href={link}
        >
            {variants[variant]}
        </FBButton>
    );
};
