import PersonCard from '@/components/cards/PersonCard';
import HorizontalListBase from '@/components/lists/HorizontalListBase';
import { Person } from '@/models/Person';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface CreditsListProps {
    cast: Person[];
    baseRoute: string;
}

export default function CreditsList({
    cast,
    baseRoute,
}: CreditsListProps): ReactElement {
    return (
        <HorizontalListBase title="Credits">
            <>
                {cast.slice(0, 10).map((p) => (
                    <li key={p.id}>
                        <PersonCard person={p} size="normal" />
                    </li>
                ))}
                <li className="flex items-center">
                    <Link
                        href={`${baseRoute}/credits`}
                        className="hover:scale-105"
                        prefetch={true}
                    >
                        <h1 className="w-32 text-center text-lg text-primaryText">
                            View more {'->'}
                        </h1>
                    </Link>
                </li>
            </>
        </HorizontalListBase>
    );
}
