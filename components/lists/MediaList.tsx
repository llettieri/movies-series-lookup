import { MediaCard } from '@/components/cards/MediaCard';
import { VerticalListBase } from '@/components/lists/VerticalListBase';
import Loading from '@/components/Loading';
import { Media } from '@/models/Media';
import React, { ReactElement } from 'react';

interface MediaListProps {
    title: string;
    medias: Media[];
    isLoading?: boolean;
}

export const MediaList = ({
    title,
    medias,
    isLoading,
}: MediaListProps): ReactElement => {
    return isLoading ? (
        <Loading />
    ) : (
        <VerticalListBase title={title}>
            <>
                {medias.map((m) => (
                    <li key={m.id}>
                        <MediaCard media={m} size="normal" />
                    </li>
                ))}
            </>
        </VerticalListBase>
    );
};
