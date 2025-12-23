import withFlowbiteReact from 'flowbite-react/plugin/nextjs';
import { NextConfig } from 'next';
import { version } from './package.json';
import { writeFileSync } from 'node:fs';

writeFileSync('./public/version.json', JSON.stringify({ version }));

const nextConfig: NextConfig = {
    allowedDevOrigins: ['llettieri.hub'],
    images: {
        remotePatterns: [{ hostname: 'image.tmdb.org' }],
    },
    output: 'standalone',
};

export default withFlowbiteReact(nextConfig);
