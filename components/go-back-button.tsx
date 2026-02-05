'use client';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export const GoBackButton = (): ReactNode => {
    const router = useRouter();

    return (
        <Button className="mx-auto w-64" onClick={router.back}>
            Go back
        </Button>
    );
};
