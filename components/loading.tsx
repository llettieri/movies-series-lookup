import { ReactNode } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function Loading(): ReactNode {
    return (
        <div className="mt-16 flex w-full flex-row justify-center">
            <h1 className="text-foreground flex items-center gap-2">
                Loading <Spinner className="size-8" />
            </h1>
        </div>
    );
}
