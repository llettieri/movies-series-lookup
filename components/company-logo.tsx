import { ReactNode } from 'react';
import { TMDBImage } from '@/components/image';
import Link from 'next/link';

interface CompanyLogoProps {
    externalLink?: string;
    alt: string;
    image: string;
}

const CompanyLogo = ({
    externalLink,
    alt,
    image,
}: CompanyLogoProps): ReactNode =>
    externalLink ? (
        <Link
            href={externalLink}
            target={externalLink ? '_blank' : '_self'}
            className="my-auto"
            rel="noreferrer"
        >
            <TMDBImage
                src={image}
                alt={alt}
                width={60}
                height={30}
                className="h-auto w-auto"
                scope="logo"
            />
        </Link>
    ) : (
        <TMDBImage
            src={image}
            alt={alt}
            width={60}
            height={30}
            className="h-auto w-auto"
            scope="logo"
        />
    );

export { CompanyLogo };
