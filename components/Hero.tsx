import Image from 'next/image';
import { ReactElement } from 'react';

export default function Hero(): ReactElement {
    return (
        <div className="text-center pb-10 py-5">
            <div className="w-60 mx-auto">
                <Image
                    className="block mx-auto"
                    src={'/media_illustration.svg'}
                    width={200}
                    height={200}
                    alt={'Videofiles'}
                />
                <h1 className="text-2xl text-primaryText uppercase font-bold">
                    Welcome to your Movie / Series lookup
                </h1>
            </div>
        </div>
    );
}
