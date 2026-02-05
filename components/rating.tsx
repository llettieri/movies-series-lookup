'use client';

import 'react-circular-progressbar/dist/styles.css';

import React, { ReactNode } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

interface RatingProps {
    value?: number;
}

export function Rating({ value }: RatingProps): ReactNode {
    return value ? (
        <div id="rating" className="absolute top-1 right-1 w-24">
            <CircularProgressbar
                value={value}
                text={`${value.toFixed(1)}%`}
                background
                styles={{
                    background: {
                        fill: '#8a2be2',
                    },
                    text: {
                        fill: '#f5f5f5',
                    },
                    path: {
                        stroke: '#f5f5f5',
                    },
                    trail: {
                        stroke: '#8a2be2',
                    },
                }}
            />
        </div>
    ) : null;
}
