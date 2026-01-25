import { MediaCard } from '@/components/cards/media-card';
import { VerticalListBase } from '@/components/lists/vertical-list-base';
import { Media } from '@/models/media';
import React, { ReactNode } from 'react';

interface MediaListProps {
    title?: string;
    mediaCallback: () => Promise<Media[]>;
}

export const MediaList = async ({
    title,
    mediaCallback,
}: MediaListProps): Promise<ReactNode> => {
    const medias = await mediaCallback();

    if (!medias.length) {
        return null;
    }

    return (
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
