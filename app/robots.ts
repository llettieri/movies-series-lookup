import { MetadataRoute } from 'next';

export default function Robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            {
                userAgent: [
                    'AI2Bot',
                    'Ai2Bot-Dolma',
                    'anthropic-ai',
                    'ChatGPT-User',
                    'Claude-Web',
                    'ClaudeBot',
                    'cohere-ai',
                    'Diffbot',
                    'DuckAssistBot',
                    'GPTBot',
                    'Meta-ExternalAgent',
                    'Meta-ExternalFetcher',
                    'OAI-SearchBot',
                    'PerplexityBot',
                    'PanguBot',
                ],
                disallow: '/',
            },
        ],
        sitemap: 'https://movies-series.lore-le.ch/sitemap.xml',
    };
}
