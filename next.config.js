/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*", // proxy ไป backend
      },
    ];
  },
};

module.exports = nextConfig;
