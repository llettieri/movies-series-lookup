import { Button } from '@/components/Button';
import PersonCard from '@/components/cards/PersonCard';
import { MediaType } from '@/models/MediaType';
import { Person } from '@/models/Person';
import React, { ReactElement } from 'react';

interface GroupedCrewComponentProps {
    groupedCrew: Map<string, Person[]>;
}

function GroupedCrewComponent({
    groupedCrew,
}: GroupedCrewComponentProps): ReactElement {
    const groups: ReactElement[] = [];
    groupedCrew.forEach((people, department) =>
        groups.push(
            <div className="mb-2">
                <h2
                    className="text-lg font-bold text-primaryText"
                    id={department.toLowerCase()}
                >
                    {department}
                </h2>
                <ul className="flex flex-col flex-wrap gap-4">
                    {people.map((p) => (
                        <li key={p.id}>
                            <PersonCard person={p} size="small" />
                        </li>
                    ))}
                </ul>
            </div>,
        ),
    );
    return <>{groups}</>;
}

interface CreditsTableProps {
    link: string;
    cast: Person[];
    crew: Person[];
    type: MediaType;
}

export default function CreditsTable({
    link,
    cast,
    crew,
    type,
}: CreditsTableProps): ReactElement {
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
            <div className="container mx-auto flex justify-center p-8 ">
                <Button title="<- Go Back" link={link} className="w-64" />
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-8 px-2 py-5 md:grid-cols-2 md:px-0">
                <div>
                    <h1 className="mx-auto mb-3 w-fit text-xl font-bold text-primaryText md:w-full">
                        {title} Cast{' '}
                        <span className="font-light text-tag">
                            ({cast.length})
                        </span>
                    </h1>
                    <ul className="flex flex-col justify-center gap-4 md:justify-start">
                        {cast.map((p) => (
                            <li key={p.id}>
                                <PersonCard size="small" person={p} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h1 className="mx-auto mb-3 w-fit text-xl font-bold text-primaryText md:w-full">
                        {title} Crew{' '}
                        <span className="font-light text-tag">
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
}
