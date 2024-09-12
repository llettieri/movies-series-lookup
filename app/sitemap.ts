import type { MetadataRoute } from 'next';

export default function Sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://movies-series.lore-le.ch/',
        },
        {
            url: 'https://movies-series.lore-le.ch/search',
        },
        {
            url: 'https://movies-series.lore-le.ch/imprint',
        },
        {
            url: 'https://movies-series.lore-le.ch/privacy',
        },
    ];
}
