import { PersonCard } from '@/components/cards/person-card';
import { MediaType } from '@/models/media-type';
import { Person } from '@/models/person';
import React, { ReactNode } from 'react';
import { GoBackButton } from '@/components/go-back-button';

interface GroupedCrewComponentProps {
    groupedCrew: Map<string, Person[]>;
}

const GroupedCrewComponent = ({
    groupedCrew,
}: GroupedCrewComponentProps): ReactNode => {
    const groups: ReactNode[] = [];
    groupedCrew.forEach((people, department) =>
        groups.push(
            <div key={department} className="mb-2">
                <h2
                    className="text-foreground mb-0!"
                    id={department.toLowerCase()}
                >
                    {department}
                </h2>
                <ul className="flex flex-col flex-wrap gap-4">
                    {people.map((p) => {
                        const mappedJobs = p.jobs?.map((j) => j.name);
                        return (
                            <li key={`crew-${p.id}-${mappedJobs?.join('-')}`}>
                                <PersonCard person={p} size="small" />
                            </li>
                        );
                    })}
                </ul>
            </div>,
        ),
    );
    return <>{groups}</>;
};

interface CreditsTableProps {
    cast: Person[];
    crew: Person[];
    type: MediaType;
}

export const CreditsTable = ({
    cast,
    crew,
    type,
}: CreditsTableProps): ReactNode => {
    const title = type === MediaType.MOVIE ? 'Movie' : 'TV Show';
    const groupedCrew: Map<string, Person[]> = new Map();

    crew.forEach((person) => {
        const key = person.department;

        if (!key) {
            return;
        }

        const collection = groupedCrew.get(key);

        if (!collection) {
            groupedCrew.set(key, [person]);
        } else {
            collection.push(person);
        }
    });

    return (
        <>
            <div className="container mx-auto flex justify-center p-8">
                <GoBackButton />
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-8 px-2 py-5 md:grid-cols-2 md:px-0">
                <div>
                    <h1 className="text-foreground mx-auto mb-3 w-fit md:w-full">
                        {title} Cast{' '}
                        <span className="text-tag font-light">
                            ({cast.length})
                        </span>
                    </h1>
                    <ul className="flex flex-col justify-center gap-4 md:justify-start">
                        {cast.map((p) => (
                            <li key={`cast-${p.id}`}>
                                <PersonCard size="small" person={p} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h1 className="text-foreground mx-auto mb-3 w-fit md:w-full">
                        {title} Crew{' '}
                        <span className="text-tag font-light">
                            ({crew.length})
                        </span>
                    </h1>
                    <div className="flex flex-col justify-center gap-4 md:justify-start">
                        <GroupedCrewComponent groupedCrew={groupedCrew} />
                    </div>
                </div>
            </div>
        </>
    );
};
