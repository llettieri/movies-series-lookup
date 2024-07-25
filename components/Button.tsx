import { Icon } from '@/icons/Icon';
import { TIcons } from '@/icons/Icons';
import Link from 'next/link';
import React, { ReactNode } from 'react';

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
    type = 'button',
    className,
    link,
    variant = 'default',
    icon,
    iconSize,
}: ButtonProps): ReactNode => {
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
            className={`btn btn-primary ${
                variant === 'icon' ? 'btn-circle' : ''
            } ${className}`}
            onClick={onClick}
            type={type}
        >
            {variants[variant]}
        </button>
    );
};
