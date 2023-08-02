import Link from 'next/link';
import { ReactElement } from 'react';

interface ButtonProps {
    title: string;
    onClick?: () => void;
    type?: 'submit' | 'reset' | 'button';
    className?: string;
    link?: string;
}

export const Button = ({
    title,
    onClick,
    type,
    className,
    link,
}: ButtonProps): ReactElement => {
    return (
        <button
            className={`bg-primary text-primaryText py-2 px-3 rounded-md border-primaryTint border-2 hover:bg-secondary hover:text-black hover:border-secondaryTint transition-colors ease-in-out duration-300 ${className}`}
            onClick={onClick}
            type={type ?? 'button'}
        >
            {link ? <Link href={link}>{title}</Link> : title}
        </button>
    );
};
