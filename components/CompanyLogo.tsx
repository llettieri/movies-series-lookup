import Image from 'next/image';
import { ReactNode } from 'react';

interface NetworkLogoProps {
    externalLink: string;
    alt: string;
    image: string;
}

export default function CompanyLogo({
    externalLink,
    alt,
    image,
}: NetworkLogoProps): ReactNode {
    return (
        <a
            href={externalLink}
            target="_blank"
            className="my-auto"
            rel="noreferrer"
        >
            <Image src={image} alt={alt} width={100} height={50} />
        </a>
    );
}
