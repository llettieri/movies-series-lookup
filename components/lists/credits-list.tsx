'use client';
import { PersonCard } from '@/components/cards/person-card';
import { Person } from '@/models/person';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { ArrowRight } from 'lucide-react';

interface CreditsListProps {
    cast: Person[];
    baseRoute: string;
}

export const CreditsList = ({
    cast,
    baseRoute,
}: CreditsListProps): ReactNode => {
    if (!cast) {
        return null;
    }

    return (
        <Carousel
            id="credits"
            className="mb-16"
            opts={{
                align: 'start',
                dragFree: true,
            }}
            plugins={[WheelGesturesPlugin({ forceWheelAxis: 'x' })]}
        >
            <h3 className="mt-8">Credits</h3>
            <CarouselContent className="md:m-4">
                {cast.slice(0, 10).map((p) => (
                    <CarouselItem
                        key={p.id}
                        className="xs:basis-1/2 basis-9/12 sm:basis-2/5 md:basis-4/12 lg:basis-1/4"
                    >
                        <PersonCard person={p} size="normal" />
                    </CarouselItem>
                ))}

                <CarouselItem className="xs:basis-1/2 flex basis-9/12 items-center sm:basis-2/5 md:basis-4/12 lg:basis-1/4">
                    <Link
                        href={`${baseRoute}/credits`}
                        prefetch
                        className="duration-150 hover:scale-105"
                    >
                        <p className="flex w-32 items-center gap-2 text-center text-lg">
                            View more <ArrowRight />
                        </p>
                    </Link>
                </CarouselItem>
            </CarouselContent>

            <CarouselPrevious variant="icon" />
            <CarouselNext variant="icon" />
        </Carousel>
    );
};
