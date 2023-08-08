import { PersonCard } from '@/components/cards/PersonCard';
import { VerticalListBase } from '@/components/lists/VerticalListBase';
import Loading from '@/components/Loading';
import { Person } from '@/models/Person';
import React, { ReactElement } from 'react';

interface PeopleListProps {
    title: string;
    people: Person[];
    isLoading?: boolean;
}

export const PeopleList = ({
    title,
    people,
    isLoading,
}: PeopleListProps): ReactElement => {
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
