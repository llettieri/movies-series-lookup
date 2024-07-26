/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'image.tmdb.org' },
        ],
    },
    output: 'standalone',
};

module.exports = nextConfig;
