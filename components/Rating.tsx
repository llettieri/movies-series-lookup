'use client';

import 'react-circular-progressbar/dist/styles.css';

import React, { ReactNode } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

interface RatingProps {
    value: number;
}

export function Rating({ value }: RatingProps): ReactNode {
    return value ? (
        <div className="absolute right-1 top-1 w-24">
            <CircularProgressbar
                value={value}
                text={`${value}%`}
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
