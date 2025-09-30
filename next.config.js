/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { reactCompiler: true },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // เพิ่มโดเมนรูป/ไฟล์จาก backend ถ้ามี เช่น
      // { protocol: "https", hostname: "api.your-domain.com" },
      // { protocol: "http", hostname: "localhost" },
    ],
  },
};

module.exports = nextConfig;
