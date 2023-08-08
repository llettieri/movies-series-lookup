import Image from 'next/image';
import { ReactElement } from 'react';

export default function Hero(): ReactElement {
    return (
        <div className="py-5 pb-10 text-center">
            <div className="mx-auto w-60">
                <Image
                    className="mx-auto block"
                    src={'/media_illustration.svg'}
                    width={200}
                    height={200}
                    alt={'Videofiles'}
                />
                <h1 className="text-2xl font-bold uppercase text-primaryText">
                    Welcome to your Movie / Series lookup
                </h1>
            </div>
        </div>
    );
}
