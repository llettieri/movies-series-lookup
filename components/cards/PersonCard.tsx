import { CardBase, CardSize } from '@/components/cards/CardBase';
import { Person } from '@/models/Person';
import React, { ReactNode } from 'react';

interface PersonCardProps {
    person: Person;
    size: CardSize;
}

export const PersonCard = ({ person, size }: PersonCardProps): ReactNode => {
    const image = person.portrait ?? '/placeholder.png';

    const getCountString = (count: number): string =>
        !isNaN(count) ? `(${count} Episode${count > 1 ? 's' : ''})` : '';

    const mappedRoles = person.roles
        ? person.roles.map((r) => `${r.name} ${getCountString(r.episodeCount)}`)
        : [];
    const mappedJobs = person.jobs
        ? person.jobs.map((j) => `${j.name} ${getCountString(j.episodeCount)}`)
        : [];

    return (
        <CardBase link={`/people/${person.id}`} image={image} size={size}>
            {size === 'normal' ? (
                <div className="flex max-h-72 flex-1 flex-col overflow-hidden overflow-ellipsis px-6 py-2">
                    <h2 className="text-xl font-bold text-primaryText">
                        {person.name}
                    </h2>
                    {person.roles ? (
                        <h3 className="mb-1 line-clamp-6 overflow-hidden text-lg text-primaryText">
                            {mappedRoles.join(', ')}
                        </h3>
                    ) : (
                        <p className="mb-1 text-base text-primaryText">
                            {person.department}
                        </p>
                    )}
                </div>
            ) : (
                <div
                    className="flex flex-col justify-center"
                    id={person.name.replace(' ', '-').toLowerCase()}
                >
                    <h2 className="text-md font-bold text-primaryText">
                        {person.name}
                    </h2>
                    {person.roles ? (
                        <h3 className="text-sm text-primaryText">
                            {mappedRoles.join(', ')}
                        </h3>
                    ) : (
                        <p className="text-base text-primaryText">
                            {mappedJobs.join(', ')}
                        </p>
                    )}
                </div>
            )}
        </CardBase>
    );
};
