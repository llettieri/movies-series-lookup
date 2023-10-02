import React, { ReactElement } from 'react';

interface VerticalListBaseProps {
    title: string;
    children: ReactElement;
}

export const VerticalListBase = ({
    children,
    title,
}: VerticalListBaseProps): ReactElement => {
    return (
        <div className="container mx-auto max-w-7xl px-4 pb-10">
            <h1 className="mb-5 mt-8 text-2xl text-primaryText">{title}</h1>
            <ul className="flex flex-row flex-wrap justify-center gap-4 lg:justify-evenly xl:justify-start">
                {children}
            </ul>
        </div>
    );
};
