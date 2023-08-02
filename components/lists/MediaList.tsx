import Loading from '@/components/Loading';
import MediaCard from '@/components/MediaCard';
import { Media } from '@/models/Media';
import React, { ReactElement } from 'react';

interface MediaListProps {
    title: string;
    medias: Media[];
    isLoading?: boolean;
}

export default function MediaList({
    title,
    medias,
    isLoading,
}: MediaListProps): ReactElement {
    return isLoading ? (
        <Loading />
    ) : (
        <div className="max-w-7xl mx-auto pb-10 px-4">
            <h1 className="text-primaryText text-2xl mt-8 mb-5">{title}</h1>
            <div className="flex flex-row flex-wrap gap-4">
                {medias.map((m) => (
                    <MediaCard key={m.id} media={m} />
                ))}
            </div>
        </div>
    );
}
