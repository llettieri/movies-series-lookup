import { Tag } from '@/components/Tag';
import { Genre } from '@/models/Genre';
import React, { ReactElement } from 'react';

interface GenreTagsProps {
    genres: Genre[];
}

export const GenreTags = ({ genres }: GenreTagsProps): ReactElement => {
    return (
        <div className="my-2 flex flex-row-reverse gap-3">
            {genres.map((genre: Genre) => (
                <Tag key={genre.id} text={genre.name} />
            ))}
        </div>
    );
};
