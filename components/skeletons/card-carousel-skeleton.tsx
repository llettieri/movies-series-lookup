import React, { ReactNode } from 'react';
import { CardSkeleton } from '@/components/skeletons/card-skeleton';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

interface SkeletonCardCarouselProps {
    title: string;
    itemCount?: number;
}

const CardCarouselSkeleton = ({
    title,
    itemCount = 10,
}: SkeletonCardCarouselProps): ReactNode => {
    return (
        <Carousel
            className="mb-16"
            opts={{
                align: 'start',
                active: false,
            }}
        >
            <h3 className="mt-8">{title}</h3>
            <CarouselContent className="md:m-4">
                {Array.from({ length: itemCount }).map((value, index) => (
                    <CarouselItem
                        key={`carousel-item-${index}`}
                        className="xs:basis-1/2 basis-9/12 sm:basis-2/5 md:basis-4/12 lg:basis-1/4"
                    >
                        <CardSkeleton size="normal" />
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious variant="icon" />
            <CarouselNext variant="icon" />
        </Carousel>
    );
};

export { CardCarouselSkeleton };
