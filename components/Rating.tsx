'use client';

import React, { ReactElement } from 'react';

interface RatingProps {
    value: number;
}

export function Rating({ value }: RatingProps): ReactElement {
    return (
        <div
            className="radial-progress absolute right-0 top-0 border-4 border-primary bg-primary text-primary-content"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style={{ '--value': value.toFixed(1) }}
            role="progressbar"
        >
            {value.toFixed(1)}%
        </div>
    );
}
