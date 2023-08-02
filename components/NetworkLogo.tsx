import { routes } from '@/app/api/config/routes';
import { Network } from '@/models/Network';
import Image from 'next/image';
import { ReactElement } from 'react';

interface NetworkLogoProps {
    network: Network;
}

export default function NetworkLogo({
    network,
}: NetworkLogoProps): ReactElement {
    return (
        <a
            href={network.homepage}
            target="_blank"
            className="my-auto"
            rel="noreferrer"
        >
            <Image
                key={network.id}
                src={`${routes.images}${network.logo_path}`}
                alt={network.name}
                width={100}
                height={50}
            />
        </a>
    );
}
