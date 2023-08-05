import Loading from '@/components/Loading';
import PersonCard from '@/components/PersonCard';
import { Person } from '@/models/Person';
import React, { ReactElement } from 'react';

interface PeopleListProps {
    title: string;
    people: Person[];
    isLoading?: boolean;
}

export default function PeopleList({
    title,
    people,
    isLoading,
}: PeopleListProps): ReactElement {
    return isLoading ? (
        <Loading />
    ) : (
        <div className="max-w-7xl mx-auto pb-10 px-4">
            <h1 className="text-primaryText text-2xl mt-8 mb-5">{title}</h1>
            <div className="flex flex-row flex-wrap gap-4 justify-center lg:justify-start">
                {people.map((p) => (
                    <PersonCard key={p.id} person={p} />
                ))}
            </div>
        </div>
    );
}
