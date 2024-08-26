'use client';

import React, { ReactNode } from 'react';

interface RatingProps {
    value: number;
}

export function Rating({ value }: RatingProps): ReactNode {
    return (
        <div
            className="radial-progress text-primary-content absolute right-0 top-0 border-4 border-primary bg-primary"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style={{ '--value': value.toFixed(1) }}
            role="progressbar"
        >
            {value}%
        </div>
    );
}
