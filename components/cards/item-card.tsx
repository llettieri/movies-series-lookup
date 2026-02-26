import React, { ReactNode } from 'react';
import { CardBase, CardSize } from '@/components/cards/card-base';
import { Person } from '@/models/person';
import { Media } from '@/models/media';
import { Item } from '@/models/base';
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import dayjs from 'dayjs';

interface MediaCardProps {
    media: Media;
    size: CardSize;
}

interface PersonCardProps {
    person: Person;
    size: CardSize;
}

interface ItemCardProps {
    item: Item;
    size: CardSize;
}

const MediaCard = ({ media, size }: MediaCardProps): ReactNode => {
    return (
        <CardBase
            link={`/${
                media.type === 'movie' ? 'movies' : 'tv-shows'
            }/${media.id}`}
            image={media.poster}
            alt={media.title}
            size={size}
        >
            <CardHeader>
                <CardTitle className="line-clamp-4 text-xl font-bold text-ellipsis">
                    {media.title}
                </CardTitle>
            </CardHeader>
            <CardFooter>
                <p className="mb-1 text-base">
                    {media.releaseDate
                        ? dayjs(media.releaseDate).format('MMMM DD, YYYY')
                        : 'Unknown'}
                </p>
            </CardFooter>
        </CardBase>
    );
};

const PersonCard = ({ person, size }: PersonCardProps): ReactNode => {
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

const ItemCard = ({ item, size }: ItemCardProps): ReactNode => {
    switch (item.type) {
        case 'person':
            return <PersonCard person={item as Person} size={size} />;
        case 'tv':
            return <MediaCard media={item as Media} size={size} />;
        case 'movie':
            return <MediaCard media={item as Media} size={size} />;
    }
};

export { ItemCard };
