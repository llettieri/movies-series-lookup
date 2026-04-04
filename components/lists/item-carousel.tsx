'use client';
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
import { ItemCard } from '@/components/cards/item-card';
import { Item } from '@/models/base';

interface CreditsListProps<I> {
    title: string;
    items: I[];
    link: string;
}

export const ItemCarousel = <I extends Item>({
    title,
    items,
    link,
}: CreditsListProps<I>): ReactNode => {
    if (!items || items.length == 0) {
        return null;
    }

    return (
        <Carousel
            id={title.toLowerCase()}
            className="mb-16"
            opts={{
                align: 'start',
                dragFree: true,
            }}
            plugins={[WheelGesturesPlugin({ forceWheelAxis: 'x' })]}
        >
            <h3 className="mt-8">{title}</h3>
            <CarouselContent className="md:m-4">
                {items.slice(0, 10).map((p) => (
                    <CarouselItem
                        key={p.id}
                        className="xs:basis-1/2 basis-9/12 sm:basis-2/5 md:basis-4/12 lg:basis-1/4"
                    >
                        <ItemCard item={p} size="normal" />
                    </CarouselItem>
                ))}

                <CarouselItem className="xs:basis-1/2 flex basis-9/12 items-center sm:basis-2/5 md:basis-4/12 lg:basis-1/4">
                    <Link
                        href={link}
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
