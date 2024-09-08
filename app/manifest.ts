import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Movies and Series Lookup',
        scope: '/',
        start_url: '/',
        id: '/',
        background_color: '#333333',
        theme_color: '#3F324C',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
            {
                src: '/logo/icon/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/logo/icon/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
