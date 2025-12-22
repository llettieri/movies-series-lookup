import { CardBase, CardSize } from '@/components/cards/card-base';
import { Person } from '@/models/person';
import React, { ReactNode } from 'react';

interface PersonCardProps {
    person: Person;
    size: CardSize;
}

export const PersonCard = ({ person, size }: PersonCardProps): ReactNode => {
    const image = person.portrait ?? '/fallback.png';

    const getCountString = (count: number): string =>
        !isNaN(count) ? `(${count} Episode${count > 1 ? 's' : ''})` : '';

    const mappedRoles = person.roles
        ? person.roles.map((r) => `${r.name} ${getCountString(r.episodeCount)}`)
        : [];
    const mappedJobs = person.jobs
        ? person.jobs.map((j) => `${j.name} ${getCountString(j.episodeCount)}`)
        : [];

    return (
        <CardBase
            link={`/people/${person.id}`}
            image={image}
            size={size}
            alt={person.name}
        >
            {size === 'normal' ? (
                <div className="flex max-h-72 flex-1 flex-col overflow-hidden px-6 py-2 text-ellipsis">
                    <h3 className="text-standard!">{person.name}</h3>
                    {person.roles ? (
                        <h4 className="text-standard! mb-1 line-clamp-6 overflow-hidden font-medium!">
                            {mappedRoles.join(', ')}
                        </h4>
                    ) : (
                        <p className="mb-1 text-base">{person.department}</p>
                    )}
                </div>
            ) : (
                <div
                    className="flex flex-col justify-center"
                    id={person.name.replace(' ', '-').toLowerCase()}
                >
                    <h4 className="text-standard!">{person.name}</h4>
                    {person.roles ? (
                        <h5 className="text-standard! line-clamp-1 overflow-hidden">
                            {mappedRoles.join(', ')}
                        </h5>
                    ) : (
                        <h5 className="text-standard! line-clamp-1 overflow-hidden">
                            {mappedJobs.join(', ')}
                        </h5>
                    )}
                </div>
            )}
        </CardBase>
    );
};
