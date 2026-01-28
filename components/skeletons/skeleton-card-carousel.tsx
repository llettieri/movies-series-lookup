import React, { ReactNode } from 'react';
import { SkeletonCard } from '@/components/skeletons/skeleton-card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

interface SkeletonCardCarouselProps {
    itemCount?: number;
}

export const SkeletonCardCarousel = ({
    itemCount = 10,
}: SkeletonCardCarouselProps): ReactNode => {
    return (
        <Carousel
            opts={{
                align: 'start',
                active: false,
            }}
        >
            <h3 className="mt-8">Credits</h3>
            <CarouselContent className="md:m-4">
                {Array.from({ length: itemCount }).map((value, index) => (
                    <CarouselItem
                        key={index}
                        className="xs:basis-1/2 basis-9/12 sm:basis-2/5 md:basis-4/12 lg:basis-1/4"
                    >
                        <SkeletonCard size="normal" />
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious variant="icon" />
            <CarouselNext variant="icon" />
        </Carousel>
    );
};
