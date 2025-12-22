import withFlowbiteReact from 'flowbite-react/plugin/nextjs';
import { NextConfig } from 'next';
import { version } from './package.json';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ hostname: 'image.tmdb.org' }],
    },
    env: {
        APP_VERSION: version,
    },
    output: 'standalone',
};

export default withFlowbiteReact(nextConfig);
