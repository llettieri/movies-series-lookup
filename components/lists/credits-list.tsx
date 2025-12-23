import { PersonCard } from '@/components/cards/person-card';
import { HorizontalListBase } from '@/components/lists/horizontal-list-base';
import { Person } from '@/models/person';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface CreditsListProps {
    cast: Person[];
    baseRoute: string;
}

export const CreditsList = ({
    cast,
    baseRoute,
}: CreditsListProps): ReactNode => {
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
                        prefetch
                    >
                        <p className="w-32 text-center text-lg">
                            View more {'->'}
                        </p>
                    </Link>
                </li>
            </>
        </HorizontalListBase>
    );
};
