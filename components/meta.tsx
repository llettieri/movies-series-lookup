import { Metadata } from 'next';

interface MetaProps {
    keywords?: string;
    description?: string;
    title?: string;
}

export const Meta = ({
    keywords = 'movie, tv, series, popular, tv-show, actors, collections',
    description = 'Browse your favourite movies and series',
    title = 'Movies & Series Lookup',
}: MetaProps): Metadata => ({
    title,
    description,
    keywords,
    manifest: '/manifest.webmanifest',
    appleWebApp: {
        title,
        capable: true,
        statusBarStyle: 'black-translucent',
    },
    icons: {
        apple: '/logo/icon/apple-touch-icon.png',
    },
});
