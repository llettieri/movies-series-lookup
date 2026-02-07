import { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonBadgesProps {
    itemCount?: number;
}

export const BadgesSkeleton = ({
    itemCount = 4,
}: SkeletonBadgesProps): ReactNode => {
    return (
        <div className="mt-2 mb-4 flex gap-3 overflow-auto md:flex-row-reverse">
            {Array.from({ length: itemCount }).map((value, index) => (
                <Skeleton
                    key={`badge-${index}`}
                    className="h-5 w-18 rounded-full"
                />
            ))}
        </div>
    );
};
