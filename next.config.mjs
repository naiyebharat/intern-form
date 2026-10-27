/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from any domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
