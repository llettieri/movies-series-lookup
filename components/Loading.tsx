import { ReactNode } from 'react';

export default function Loading(): ReactNode {
    return (
        <div className="mt-16 flex w-full flex-row justify-center">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-primaryText">
                Loading <span className="loading loading-infinity loading-lg" />
            </h1>
        </div>
    );
}
