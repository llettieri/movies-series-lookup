import { ReactElement } from 'react';

export default function Loading(): ReactElement {
    return (
        <div className="mt-16 flex w-full flex-row justify-center">
            <h1 className="text-2xl font-bold text-primaryText">Loading ...</h1>
        </div>
    );
}
