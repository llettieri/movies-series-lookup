/* eslint-disable camelcase */
import { MetadataRoute } from 'next';

export default function Manifest(): MetadataRoute.Manifest {
    return {
        background_color: '#4c3165',
        categories: ['entertainment', 'lifestyle'],
        description: 'Browse your favourite movies and series',
        display: 'standalone',
        display_override: [
            'fullscreen',
            'minimal-ui',
            'window-controls-overlay',
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
        id: '/',
        lang: 'en',
        launch_handler: {
            client_mode: ['focus-existing', 'navigate-existing', 'auto'],
        },
        name: 'Movies and Series Lookup',
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
        scope: '/',
        short_name: 'Movies and Series',
        start_url: '/',
        theme_color: '#3F324C',
    };
}
