'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalListBaseProps {
    children: ReactNode;
    title: string;
}

export const HorizontalListBase = ({
    children,
    title,
}: HorizontalListBaseProps): ReactNode => {
    const [showPrevious, setShowPrevious] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const scrollContainer = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const ref = scrollContainer.current;
        if (ref) {
            setShowNext(ref.scrollWidth > ref.clientWidth);
        }
    }, [scrollContainer]);

    const scroll = (value: number): void =>
        scrollContainer.current?.scrollBy({
            left: value,
            behavior: 'smooth',
        });

    const onScroll = (): void => {
        const ref = scrollContainer.current;
        if (ref) {
            setShowPrevious(ref.scrollLeft !== 0);
            setShowNext(
                Math.abs(
                    Math.round(ref.scrollWidth - ref.scrollLeft) -
                        ref.clientWidth,
                ) > 3,
            );
        }
    };

    return (
        <div className="relative container">
            <h3 className="mt-8">{title}</h3>
            <ul
                className="no-scrollbar flex h-full max-w-full flex-row gap-4 overflow-auto p-4"
                ref={scrollContainer}
                onScroll={onScroll}
            >
                {children}
            </ul>

            <Button
                onClick={(): void => scroll(200)}
                variant="icon"
                size="icon-lg"
                className={`absolute top-1/2 right-3 ${
                    showNext ? '' : 'hidden'
                }`}
            >
                <ChevronRight />
            </Button>
            <Button
                onClick={(): void => scroll(-200)}
                variant="icon"
                size="icon-lg"
                className={`absolute top-1/2 left-3 transition-none ${
                    showPrevious ? '' : 'hidden'
                }`}
            >
                <ChevronLeft />
            </Button>
        </div>
    );
};
