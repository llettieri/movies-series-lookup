'use client';

import { Button } from '@/components/Button';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

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
        <div className="container relative">
            <h3 className="mt-8">{title}</h3>
            <ul
                className="no-scrollbar flex h-full max-w-full flex-row gap-4 overflow-auto p-4"
                ref={scrollContainer}
                onScroll={onScroll}
            >
                {children}
            </ul>

            <Button
                title="Next"
                onClick={(): void => scroll(200)}
                variant="icon"
                icon={<IoChevronForwardOutline size="2em" />}
                className={`absolute right-3 top-1/2 ${
                    showNext ? '' : 'hidden'
                }`}
            />
            <Button
                title="Previous"
                onClick={(): void => scroll(-200)}
                variant="icon"
                icon={<IoChevronBackOutline size="2em" />}
                className={`absolute left-3 top-1/2 transition-none ${
                    showPrevious ? '' : 'hidden'
                }`}
            />
        </div>
    );
};
