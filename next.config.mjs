import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: 'image.tmdb.org'},
        ],
    },
    output: 'standalone',
};

export default withFlowbiteReact(nextConfig);