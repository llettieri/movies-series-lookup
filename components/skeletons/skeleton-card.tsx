import React, { ReactNode } from 'react';
import { CardSize } from '@/components/cards/card-base';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
    size: CardSize;
}

export const SkeletonCard = ({ size }: SkeletonCardProps): ReactNode => {
    if (size === 'normal') {
        return (
            <Card className="md:hover:drop-s h-full w-48">
                <Skeleton className="h-70 rounded-b-none" />
                <div className="flex h-40 flex-col justify-between gap-3 py-2">
                    <CardHeader>
                        <Skeleton className="h-10" />
                    </CardHeader>
                    <CardFooter>
                        <Skeleton className="h-6 w-full" />
                    </CardFooter>
                </div>
            </Card>
        );
    }
};
