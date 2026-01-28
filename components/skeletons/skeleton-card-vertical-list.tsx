import { ReactNode } from 'react';
import { VerticalListBase } from '@/components/lists/vertical-list-base';
import { SkeletonCard } from '@/components/skeletons/skeleton-card';

interface SkeletonCardVerticalListProps {
    title?: string;
    itemCount?: number;
}

export const SkeletonCardVerticalList = ({
    title,
    itemCount = 20,
}: SkeletonCardVerticalListProps): ReactNode => {
    return (
        <VerticalListBase title={title}>
            {Array.from({ length: itemCount }).map((value, index) => (
                <SkeletonCard key={index} size="normal" />
            ))}
        </VerticalListBase>
    );
};
