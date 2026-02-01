/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/frontend/login" }, // landing page
    ];
  },
};

export default nextConfig;
