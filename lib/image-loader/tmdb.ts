import { ImageLoaderProps } from 'next/image';
import { apiRoutes } from '@/config/api-routes';

export type Scope = 'poster' | 'logo' | 'backdrop' | 'profile';

interface TMDBLoaderProps {
    scope: Scope;
}

const parsePosterWidth = (width: number): string => {
    if (width > 780) {
        return 'w780';
    } else if (width > 500) {
        return 'w500';
    } else if (width > 342) {
        return 'w342';
    } else if (width > 185) {
        return 'w185';
    } else if (width > 154) {
        return 'w154';
    } else if (width > 92) {
        return 'w92';
    } else {
        return 'original';
    }
};
const parseLogoWidth = (width: number): string => {
    if (width > 500) {
        return 'w500';
    } else if (width > 300) {
        return 'w300';
    } else if (width > 185) {
        return 'w185';
    } else if (width > 154) {
        return 'w154';
    } else if (width > 92) {
        return 'w92';
    } else if (width > 45) {
        return 'w45';
    } else {
        return 'original';
    }
};
const parseBackdropWidth = (width: number): string => {
    if (width > 1280) {
        return 'w1280';
    } else if (width > 780) {
        return 'w780';
    } else if (width > 300) {
        return 'w300';
    } else {
        return 'original';
    }
};
const parseProfileWidth = (width: number): string => {
    if (width > 632) {
        return 'h632';
    } else if (width > 185) {
        return 'w185';
    } else if (width > 45) {
        return 'w45';
    } else {
        return 'original';
    }
};

const parseWidth = (scope: Scope, width: number): string => {
    switch (scope) {
    case 'poster':
        return parsePosterWidth(width);
    case 'logo':
        return parseLogoWidth(width);
    case 'backdrop':
        return parseBackdropWidth(width);
    case 'profile':
        return parseProfileWidth(width);
    }
};

const tmdbLoader = ({
    scope,
    src,
    width,
}: TMDBLoaderProps & ImageLoaderProps): string => {
    const baseUrl = apiRoutes.images.expand({
        size: parseWidth(scope, width),
    });
    const url = new URL(`${baseUrl}${src}`);

    return url.href;
};

export default tmdbLoader;
