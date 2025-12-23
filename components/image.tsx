'use client';

import Image, { ImageProps } from 'next/image';
import { ReactElement } from 'react';
import tmdbLoader, { Scope } from '@/lib/image-loader/tmdb';

const FALLBACK_IMAGE = '/fallback.png';

interface TMDBImageProps {
    scope: Scope;
}

const TMDBImage = (
    imageProps: Omit<ImageProps, 'loader'> & TMDBImageProps,
): ReactElement => {
    const isFallback = imageProps.src == FALLBACK_IMAGE;

    return isFallback ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image unoptimized={true} {...imageProps} />
    ) : (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
            {...imageProps}
            loader={(props) =>
                tmdbLoader({
                    ...props,
                    scope: imageProps.scope,
                })
            }
        />
    );
};

export { TMDBImage, FALLBACK_IMAGE };
