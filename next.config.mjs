/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'ykzonfejbmyzhplvgnhm.supabase.co',
      },
    ],
  },
};

export default nextConfig;
