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
    abstract: description,
    appleWebApp: {
        title,
        capable: true,
        statusBarStyle: 'black-translucent',
    },
    applicationName: title,
    description,
    generator: 'Next.js',
    icons: {
        apple: '/logo/icon/apple-touch-icon.png',
    },
    keywords,
    manifest: '/manifest.webmanifest',
    robots: {
        follow: true,
        index: true,
    },
    title,
});
