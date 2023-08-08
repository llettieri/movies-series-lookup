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
            className={`rounded-md border-2 border-primaryTint bg-primary px-3 py-2 text-primaryText transition-colors duration-300 ease-in-out hover:border-secondaryTint hover:bg-secondary hover:text-black ${className}`}
            onClick={onClick}
            type={type ?? 'button'}
        >
            {link ? (
                <Link href={link} prefetch={true}>
                    {title}
                </Link>
            ) : (
                title
            )}
        </button>
    );
};
