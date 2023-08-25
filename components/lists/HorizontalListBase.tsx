'use client';

import { Button } from '@/components/Button';
import React, { ReactElement, useRef, useState } from 'react';

interface HorizontalListBaseProps {
    children: ReactElement;
    title: string;
}

export const HorizontalListBase = ({
    children,
    title,
}: HorizontalListBaseProps): ReactElement => {
    const [showPrevious, setShowPrevious] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const scrollContainer = useRef<HTMLUListElement>(null);

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
            <h1 className="mt-8 text-2xl text-primaryText">{title}</h1>
            <ul
                className="no-scrollbar flex h-full max-w-full flex-row gap-4 overflow-auto px-3 py-7"
                ref={scrollContainer}
                onScroll={onScroll}
            >
                {children}
            </ul>

            <Button
                title="Next"
                onClick={(): void => scroll(200)}
                variant="icon"
                icon="ARROW"
                className={`absolute right-3 top-1/2 text-primaryText ${
                    showNext ? '' : 'hidden'
                }`}
            />
            <Button
                title="Next"
                onClick={(): void => scroll(-200)}
                variant="icon"
                icon="ARROW"
                className={`absolute left-3 top-1/2 rotate-180 ${
                    showPrevious ? '' : 'hidden'
                }`}
            />
        </div>
    );
};
