import React, { ReactNode } from 'react';

interface VerticalListBaseProps {
    title?: string;
    children: ReactNode;
}

export const VerticalListBase = ({
    children,
    title,
}: VerticalListBaseProps): ReactNode => {
    return (
        <div className="container mx-auto max-w-7xl">
            {title && (
                <h3 className="text-standard mt-8 mb-5 text-2xl">{title}</h3>
            )}
            <ul className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 xl:grid-cols-6">
                {children}
            </ul>
        </div>
    );
};
