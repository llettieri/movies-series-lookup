import { MetadataRoute } from 'next';

export default function Robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://movies-series.lore-le.ch/sitemap.xml',
    };
}
