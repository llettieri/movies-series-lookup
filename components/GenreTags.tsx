import { Genre } from '@/models/Genre';
import React, { ReactNode } from 'react';

interface GenreTagsProps {
    genres: Genre[];
}

export const GenreTags = ({ genres }: GenreTagsProps): ReactNode => {
    return (
        <div className="my-2 flex flex-row-reverse gap-3">
            {genres.map((genre: Genre) => (
                <div
                    key={genre.id}
                    className="badge badge-accent badge-lg font-bold uppercase"
                >
                    {genre.name}
                </div>
            ))}
        </div>
    );
};
