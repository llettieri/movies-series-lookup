import { Genre } from '@/models/genre';
import React, { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';

interface GenreBadgesProps {
    genres: Genre[];
}

export const GenreBadges = ({ genres }: GenreBadgesProps): ReactNode => {
    return (
        <div
            id="genres"
            className="mt-2 mb-4 flex gap-3 overflow-auto md:flex-row-reverse"
        >
            {genres.map((genre: Genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
            ))}
        </div>
    );
};
