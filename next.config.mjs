/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // mongodb ne doit pas être bundlé (deps natives optionnelles) — il n'est
  // utilisé qu'au build par generateStaticParams (lib/server/data.ts).
  serverExternalPackages: ['mongodb'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-e3a8222f57b944158e63ec00767bf15f.r2.dev',
      },
    ],
  },
};

export default nextConfig;
