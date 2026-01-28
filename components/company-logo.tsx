import { ReactNode } from 'react';
import { TMDBImage } from '@/components/image';
import Link from 'next/link';

interface CompanyLogoProps {
    externalLink?: string;
    alt: string;
    image: string;
}

export default function CompanyLogo({
    externalLink = '',
    alt,
    image,
}: CompanyLogoProps): ReactNode {
    return (
        <Link
            href={externalLink}
            target={externalLink ? '_blank' : '_self'}
            className="my-auto"
            rel="noreferrer"
        >
            <TMDBImage
                src={image}
                alt={alt}
                width={50}
                height={25}
                className="h-auto w-auto"
                scope="logo"
            />
        </Link>
    );
}
