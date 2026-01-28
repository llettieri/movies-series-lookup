import { ReactNode } from 'react';
import { VerticalListBase } from '@/components/lists/vertical-list-base';
import { SkeletonCard } from '@/components/skeletons/skeleton-card';

interface SkeletonListProps {
    title?: string;
    itemCount?: number;
}

export const SkeletonVerticalList = ({
    title,
    itemCount = 10,
}: SkeletonListProps): ReactNode => {
    return (
        <VerticalListBase title={title}>
            {Array.from({ length: itemCount }).map((value, index) => (
                <SkeletonCard key={index} size="normal" />
            ))}
        </VerticalListBase>
    );
};
