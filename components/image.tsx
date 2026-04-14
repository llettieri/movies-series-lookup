'use client';

import Image, { ImageProps } from 'next/image';
import { ReactElement } from 'react';
import tmdbLoader, { Scope } from '@/lib/image-loader/tmdb';

const FALLBACK_IMAGE = '/fallback.png';

interface TMDBImageProps {
    scope: Scope;
}

const TMDBImage = (
    imageProps: Omit<ImageProps, 'loader' | 'src'> &
        TMDBImageProps & { src: string | null },
): ReactElement => {
    const src = imageProps.src ?? FALLBACK_IMAGE;
    const isFallback = src === FALLBACK_IMAGE;

    return isFallback ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image unoptimized={true} {...imageProps} src={src} loading="eager" />
    ) : (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
            {...imageProps}
            src={src}
            loader={(props) =>
                tmdbLoader({
                    ...props,
                    scope: imageProps.scope,
                })
            }
            loading="eager"
        />
    );
};

export { TMDBImage, FALLBACK_IMAGE };
