import { CardBase, CardSize } from '@/components/cards/card-base';
import { Media } from '@/models/media';
import { MediaType } from '@/models/media-type';
import dayjs from 'dayjs';
import React, { ReactNode } from 'react';
import { CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
