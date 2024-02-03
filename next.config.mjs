/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa'

const nextConfig = {

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://backend-of-inventory-management-system.vercel.app/:path*',
            },
        ];
    },
    ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true
    })

};

export default nextConfig;
