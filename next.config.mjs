/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
      unoptimized: true, // Disables image optimization for static export
    }
};

export default nextConfig;
