import { CardBase, CardSize } from '@/components/cards/CardBase';
import { Media } from '@/models/Media';
import { MediaType } from '@/models/MediaType';
import dayjs from 'dayjs';
import React, { ReactNode } from 'react';

interface MediaCardProps {
    media: Media;
    size: CardSize;
}

export const MediaCard = ({ media, size }: MediaCardProps): ReactNode => {
    const image = media.poster ?? '/placeholder.svg';
    return (
        <CardBase
            link={`/${
                media.mediaType === MediaType.MOVIE ? 'movies' : 'tv-shows'
            }/${media.id}`}
            image={image}
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
