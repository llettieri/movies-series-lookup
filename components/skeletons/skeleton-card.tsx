import React, { ReactNode } from 'react';
import { CardSize } from '@/components/cards/card-base';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface SkeletonCardProps {
    size: CardSize;
}

export const SkeletonCard = ({ size }: SkeletonCardProps): ReactNode => {
    if (size === 'normal') {
        return (
            <Card className="md:hover:drop-s h-full w-48">
                <AspectRatio ratio={9 / 16}>
                    <Skeleton className="h-full w-full rounded-b-none object-cover" />
                </AspectRatio>
                <div className="flex h-40 flex-col justify-between gap-3 py-2">
                    <CardHeader>
                        <Skeleton className="h-5" />
                        <Skeleton className="h-5 w-3/5" />
                    </CardHeader>
                    <CardFooter>
                        <Skeleton className="h-6 w-full" />
                    </CardFooter>
                </div>
            </Card>
        );
    }

    return (
        <Card className="flex-row items-center">
            <div className="h-full w-30 shrink-0">
                <AspectRatio ratio={1 / 1}>
                    <Skeleton className="h-full w-full rounded-r-none object-cover" />
                </AspectRatio>
            </div>

            <div className="mx-4 my-2 flex w-full flex-col">
                <CardHeader className="px-0">
                    <CardTitle className="font-bold">
                        <Skeleton className="h-5 w-40" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                    <Skeleton className="h-4 w-40" />
                </CardContent>
            </div>
        </Card>
    );
};
