/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        // Matches any file under public/models/
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            // Allows WebGL/Three.js cross-origin loaders to fetch the file safely
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/events',
        destination: '/#events',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
