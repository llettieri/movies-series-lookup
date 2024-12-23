import Image from 'next/image';
import { ReactNode } from 'react';

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
            <Image
                src={image}
                alt={alt}
                width={50}
                height={25}
                className="h-auto w-auto"
            />
        </a>
    );
}
