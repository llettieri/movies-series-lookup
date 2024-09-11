import Image from 'next/image';
import { ReactNode } from 'react';

export const Hero = (): ReactNode => {
    return (
        <div className="pb-10 text-center">
            <div className="mx-auto w-60">
                <Image
                    className="mx-auto block h-auto w-auto"
                    src={'/media_illustration.svg'}
                    width={200}
                    height={200}
                    alt={'Videofiles'}
                />
                <h1 className="text-2xl font-bold uppercase text-primaryText">
                    Welcome to your Movies / Series lookup
                </h1>
            </div>
        </div>
    );
};
