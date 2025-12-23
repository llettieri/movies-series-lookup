import { CardBase, CardSize } from '@/components/cards/card-base';
import { Media } from '@/models/media';
import { MediaType } from '@/models/media-type';
import dayjs from 'dayjs';
import React, { ReactNode } from 'react';

interface MediaCardProps {
    media: Media;
    size: CardSize;
}

export const MediaCard = ({ media, size }: MediaCardProps): ReactNode => {
    return (
        <CardBase
            link={`/${
                media.mediaType === MediaType.MOVIE ? 'movies' : 'tv-shows'
            }/${media.id}`}
            image={media.poster}
            alt={media.title}
            size={size}
        >
            <div className="flex flex-1 flex-col justify-between px-6 py-2">
                <h2 className="text-standard mb-1 line-clamp-4 text-xl font-bold text-ellipsis">
                    {media.title}
                </h2>
                <p className="text-standard mb-1 text-base">
                    {media.releaseDate
                        ? dayjs(media.releaseDate).format('MMMM DD, YYYY')
                        : 'Unknown'}
                </p>
            </div>
        </CardBase>
    );
};
