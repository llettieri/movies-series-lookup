/* eslint-disable camelcase */
import { MetadataRoute } from 'next';

export default function Manifest(): MetadataRoute.Manifest {
    return {
        name: 'Movies and Series Lookup',
        short_name: 'Movies and Series',
        description: 'Browse your favourite movies and series',
        scope: '/',
        start_url: '/',
        id: '/',
        background_color: '#333333',
        theme_color: '#3F324C',
        display_override: [
            'fullscreen',
            'minimal-ui',
            'window-controls-overlay',
        ],
        display: 'standalone',
        orientation: 'portrait',
        protocol_handlers: [
            {
                protocol: 'web+collection',
                url: '/?collection=%s',
            },
            {
                protocol: 'web+listType',
                url: '/?listType=%s',
            },
        ],
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
