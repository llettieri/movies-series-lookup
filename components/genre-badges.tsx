import { Genre } from '@/models/genre';
import { Badge } from 'flowbite-react';
import React, { ReactNode } from 'react';

interface GenreBadgesProps {
    genres: Genre[];
}

export const GenreBadges = ({ genres }: GenreBadgesProps): ReactNode => {
    return (
        <div className="my-2 flex flex-row-reverse gap-3">
            {genres.map((genre: Genre) => (
                <Badge
                    className="bg-primary hover:bg-primary text-standard cursor-pointer"
                    key={genre.id}
                >
                    {genre.name}
                </Badge>
            ))}
        </div>
    );
};
