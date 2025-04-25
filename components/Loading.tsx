import { Spinner } from 'flowbite-react';
import { ReactNode } from 'react';

export default function Loading(): ReactNode {
    return (
        <div className="mt-16 flex w-full flex-row justify-center">
            <h1 className="text-standard flex items-center gap-2">
                Loading <Spinner className="fill-primary" />
            </h1>
        </div>
    );
}
