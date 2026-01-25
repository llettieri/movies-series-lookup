import { CardBase, CardSize } from '@/components/cards/card-base';
import { Person } from '@/models/person';
import React, { ReactNode } from 'react';
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface PersonCardProps {
    person: Person;
    size: CardSize;
}

export const PersonCard = ({ person, size }: PersonCardProps): ReactNode => {
    const image = person.portrait;

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
                <div className="flex max-h-72 flex-1 flex-col justify-between gap-3">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">
                            {person.name}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="text-ellipsis">
                        {person.roles ? (
                            <h4 className="text-foreground mb-1 line-clamp-4 overflow-hidden font-medium">
                                {mappedRoles.join(', ')}
                            </h4>
                        ) : (
                            <p className="text-foreground mb-1 line-clamp-4 overflow-hidden font-medium">
                                {person.department}
                            </p>
                        )}
                    </CardFooter>
                </div>
            ) : (
                <div
                    className="flex flex-col justify-center"
                    id={person.name.replace(' ', '-').toLowerCase()}
                >
                    <CardHeader className="px-0">
                        <CardTitle className="font-bold">
                            {person.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                        {person.roles ? (
                            <h5 className="text-foreground! line-clamp-1 overflow-hidden">
                                {mappedRoles.join(', ')}
                            </h5>
                        ) : (
                            <h5 className="text-foreground! line-clamp-1 overflow-hidden">
                                {mappedJobs.join(', ')}
                            </h5>
                        )}
                    </CardContent>
                </div>
            )}
        </CardBase>
    );
};
