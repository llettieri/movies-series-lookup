import { ReactNode } from 'react';
import { VerticalListBase } from '@/components/lists/vertical-list-base';
import { CardSkeleton } from '@/components/skeletons/card-skeleton';

interface SkeletonCardVerticalListProps {
    title?: string;
    itemCount?: number;
}

export const CardVerticalListSkeleton = ({
    title,
    itemCount = 20,
}: SkeletonCardVerticalListProps): ReactNode => {
    return (
        <VerticalListBase title={title}>
            {Array.from({ length: itemCount }).map((value, index) => (
                <CardSkeleton key={`card-${index}`} size="normal" />
            ))}
        </VerticalListBase>
    );
};
