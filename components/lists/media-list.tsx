import { MediaCard } from '@/components/cards/media-card';
import { VerticalListBase } from '@/components/lists/vertical-list-base';
import Loading from '@/components/loading';
import { Media } from '@/models/media';
import React, { ReactNode } from 'react';

interface MediaListProps {
    title?: string;
    medias: Media[];
    isLoading?: boolean;
}

export const MediaList = ({
    title,
    medias,
    isLoading,
}: MediaListProps): ReactNode => {
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
