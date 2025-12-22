import Loading from '@/components/loading';
import Image from 'next/image';
import React, { ReactNode } from 'react';

export default function LoadingPage(): ReactNode {
    return (
        <div className="mx-auto mt-64 flex w-48 flex-col gap-5">
            <Image src="/loading.svg" width={300} height={500} alt="Loading" />
            <Loading />
        </div>
    );
}
