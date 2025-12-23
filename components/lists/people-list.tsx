import { PersonCard } from '@/components/cards/person-card';
import { VerticalListBase } from '@/components/lists/vertical-list-base';
import Loading from '@/components/loading';
import { Person } from '@/models/person';
import React, { ReactNode } from 'react';

interface PeopleListProps {
    title: string;
    people: Person[];
    isLoading?: boolean;
}

export const PeopleList = ({
    title,
    people,
    isLoading,
}: PeopleListProps): ReactNode => {
    return isLoading ? (
        <Loading />
    ) : (
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
