import { Person } from '@/models/Person';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function PeopleList({
    people,
}: {
    people: Person[];
}): ReactElement {
    return (
        <>
            {people.map((p, index, array) => (
                <Link key={p.id} href={`/people/${p.id}`}>
                    <span className="font-bold text-gray-400">
                        {p.name} as {p.character}
                        {index < array.length - 1 ? ', ' : ''}
                    </span>
                </Link>
            ))}
        </>
    );
}
