import { ImageLoaderProps } from 'next/image';
import { apiRoutes } from '@/config/api-routes';

export type Scope = 'poster' | 'logo' | 'backdrop' | 'profile';

// TMDB supported width map
const TMDB_WIDTH_MAPS: Record<
    Scope,
    Array<{ threshold: number; size: string }>
> = {
    poster: [
        { threshold: 780, size: 'w780' },
        { threshold: 500, size: 'w500' },
        { threshold: 342, size: 'w342' },
        { threshold: 185, size: 'w185' },
        { threshold: 154, size: 'w154' },
        { threshold: 92, size: 'w92' },
        { threshold: 0, size: 'original' },
    ],
    logo: [
        { threshold: 500, size: 'w500' },
        { threshold: 300, size: 'w300' },
        { threshold: 185, size: 'w185' },
        { threshold: 154, size: 'w154' },
        { threshold: 92, size: 'w92' },
        { threshold: 45, size: 'w45' },
        { threshold: 0, size: 'original' },
    ],
    backdrop: [
        { threshold: 1280, size: 'w1280' },
        { threshold: 780, size: 'w780' },
        { threshold: 300, size: 'w300' },
        { threshold: 0, size: 'original' },
    ],
    profile: [
        { threshold: 185, size: 'w185' },
        { threshold: 45, size: 'w45' },
        { threshold: 0, size: 'original' },
    ],
};

interface TMDBLoaderProps {
    scope: Scope;
}
const parseWidth = (scope: Scope, width: number): string => {
    const sizes = TMDB_WIDTH_MAPS[scope];

    return sizes.reduceRight(
        (acc, { threshold, size }) => (width > threshold ? size : acc),
        'original',
    );
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
