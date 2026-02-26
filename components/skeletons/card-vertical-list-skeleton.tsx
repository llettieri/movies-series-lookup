import { ReactNode } from 'react';
import { ListBase } from '@/components/lists/list-base';
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
        <ListBase title={title}>
            {Array.from({ length: itemCount }).map((value, index) => (
                <CardSkeleton key={`card-${index}`} size="normal" />
            ))}
        </ListBase>
    );
};
