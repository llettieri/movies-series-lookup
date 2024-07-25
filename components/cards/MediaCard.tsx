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
    const image = media.poster ?? '/placeholder.png';
    return (
        <CardBase
            link={`/${
                media.mediaType === MediaType.MOVIE ? 'movies' : 'tv-shows'
            }/${media.id}`}
            image={image}
            size={size}
        >
            <div className="flex flex-1 flex-col justify-between px-6 py-2">
                <h2 className="mb-1 text-xl font-bold text-primaryText">
                    {media.title}
                </h2>
                <p className="mb-1 text-base text-primaryText">
                    {dayjs(media.releaseDate).format('MMMM DD, YYYY')}
                </p>
            </div>
        </CardBase>
    );
};
