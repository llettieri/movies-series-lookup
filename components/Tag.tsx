import { ReactElement } from 'react';

interface TagProps {
    text: string;
}

export function Tag({ text }: TagProps): ReactElement {
    return (
        <div className="pointer-events-none w-fit rounded-md bg-tag px-3 text-sm font-bold uppercase leading-8">
            <p>{text}</p>
        </div>
    );
}
