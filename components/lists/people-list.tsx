import { PersonCard } from '@/components/cards/person-card';
import { VerticalListBase } from '@/components/lists/vertical-list-base';
import { Person } from '@/models/person';
import React, { ReactNode } from 'react';

interface PeopleListProps {
    title: string;
    peopleCallback?: () => Promise<Person[]>;
    people?: Person[];
}

export const PeopleList = async ({
    title,
    peopleCallback,
    people = [],
}: PeopleListProps): Promise<ReactNode> => {
    if (peopleCallback) {
        people = await peopleCallback();
    }

    if (!people.length) {
        return null;
    }

    return (
        <VerticalListBase title={title}>
            <>
                {people.map((p) => (
                    <li key={p.id}>
                        <PersonCard key={p.id} person={p} size="normal" />
                    </li>
                ))}
            </>
        </VerticalListBase>
    );
};
