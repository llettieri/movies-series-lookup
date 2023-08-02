import { ReactElement } from 'react';

export default function Loading(): ReactElement {
    return (
        <div className="w-full flex flex-row justify-center mt-16">
            <h1 className="text-2xl font-bold text-primaryText">Loading ...</h1>
        </div>
    );
}
