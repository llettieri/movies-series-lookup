import { ReactNode } from 'react';
import { TMDBImage } from '@/components/image';

interface CompanyLogoProps {
    externalLink: string;
    alt: string;
    image: string;
}

export default function CompanyLogo({
    externalLink,
    alt,
    image,
}: CompanyLogoProps): ReactNode {
    return (
        <a
            href={externalLink}
            target="_blank"
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
        </a>
    );
}
