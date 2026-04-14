import React, { ReactNode } from 'react';
import { TMDBImage } from '@/components/image';
import { Scope } from '@/lib/image-loader/tmdb';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Rating } from '@/components/rating';
import { GenreBadges } from '@/components/genre-badges';
import { Genre } from '@/models/genre';

interface MetadataRow {
    label: string;
    value: string;
}

type ImageAspect = 'portrait' | 'landscape';

interface ImageConfig {
    scope: Scope;
    ratio: number;
}

const IMAGE_CONFIG: Record<ImageAspect, ImageConfig> = {
    portrait: { scope: 'poster', ratio: 2 / 3 },
    landscape: { scope: 'backdrop', ratio: 16 / 9 },
};

interface DetailLayoutProps {
    backdrop: string | null;
    image: string;
    imageAspect: ImageAspect;
    alt: string;
    title: ReactNode;
    subtitle?: ReactNode;
    rating?: number;
    genres?: Genre[];
    homepage?: string;
    description?: string;
    metadata?: (MetadataRow | null)[];
    children?: ReactNode;
}

const DetailLayout = ({
    backdrop,
    image,
    imageAspect,
    alt,
    title,
    subtitle,
    rating,
    genres,
    homepage,
    description,
    metadata = [],
    children,
}: DetailLayoutProps): ReactNode => {
    const hasBackdrop = backdrop !== null;
    const showPeek = imageAspect === 'portrait';

    const { scope, ratio: aspectRatio } = IMAGE_CONFIG[imageAspect];

    const titleNode = homepage ? (
        <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            className="underline"
        >
            {title}
        </a>
    ) : (
        title
    );
    const metadataRows = metadata
        .filter((row) => row !== null)
        .map(({ label, value }) => (
            <p key={label} className="mb-1">
                {label}:{' '}
                <span className="text-secondary font-bold">{value}</span>
            </p>
        ));
    const descriptionNode = description ? (
        <p id="description" className="mt-4 text-sm">
            {description}
        </p>
    ) : null;
    const subtitleNode =
        subtitle != null ? (
            <h2 id="subtitle" className="text-secondary">
                {subtitle}
            </h2>
        ) : null;

    return (
        <>
            {hasBackdrop ? (
                <div className="relative mx-auto -mb-8 hidden max-w-4xl md:block 2xl:max-w-7xl">
                    <AspectRatio ratio={16 / 9}>
                        <TMDBImage
                            id="backdrop"
                            src={backdrop}
                            className="object-cover"
                            alt=""
                            scope="backdrop"
                            fill
                            sizes="(min-width: 48rem) 80rem, 18.75rem"
                        />
                    </AspectRatio>
                    <div className="to-background absolute inset-0 bg-linear-to-b from-transparent" />
                    <Rating value={rating} />
                </div>
            ) : null}
            <div className="container mx-auto max-w-4xl px-3 py-2">
                <div className="relative z-10 mb-4 flex flex-col gap-4 md:flex-row">
                    {showPeek ? (
                        <div className="relative mx-auto w-70 shrink-0 md:m-0 md:w-50">
                            <AspectRatio ratio={aspectRatio}>
                                <TMDBImage
                                    id="poster"
                                    src={image}
                                    className="rounded-md object-cover"
                                    alt={alt}
                                    scope={scope}
                                    fill
                                    sizes="(min-width: 64rem) 80rem, (min-width: 48rem) 31.25rem, 18.75rem"
                                />
                            </AspectRatio>
                        </div>
                    ) : null}
                    <div>
                        <h1 id="title">{titleNode}</h1>
                        {subtitleNode}
                        {metadataRows}
                    </div>
                </div>
                {genres && <GenreBadges genres={genres} />}
                {descriptionNode}
                {children}
            </div>
        </>
    );
};

export { DetailLayout };
