import { ReactElement } from 'react';

interface HorizontalListBaseProps {
    children: ReactElement;
    title: string;
}

export default function HorizontalListBase({
    children,
    title,
}: HorizontalListBaseProps): ReactElement {
    return (
        <div className="container">
            <h1 className="mt-8 text-2xl text-primaryText">{title}</h1>
            <ul className="flex h-full max-w-full flex-row gap-4 overflow-auto px-3 py-7">
                {children}
            </ul>
        </div>
    );
}
