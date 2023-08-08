'use client';

import React, { ReactElement } from 'react';
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';

interface RatingProps {
    value: number;
}

export function Rating({ value }: RatingProps): ReactElement {
    return (
        <div className="absolute right-0 top-0 w-32 rounded-bl-lg bg-mainBackground bg-opacity-80 p-3">
            <CircularProgressbarWithChildren
                value={Number(value.toFixed(1))}
                styles={buildStyles({
                    pathColor: '#b95eda',
                    trailColor: '#8a2be2',
                })}
            >
                <div className="p-4r flex flex-col items-center">
                    <h1 className="font-bold text-primaryText">Score</h1>
                    <h1 className="font-bold text-primaryText">
                        {value.toFixed(1)}%
                    </h1>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
}
