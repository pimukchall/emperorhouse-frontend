/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // โปรไฟล์/ไฟล์ (ตรงที่เราใช้)
      { source: "/profile/:path*", destination: "http://localhost:4000/profile/:path*" },
      // ถ้า API อื่น ๆ อยู่ /api ก็ proxy ด้วย (มี/ไม่มี ก็ลบได้)
      { source: "/api/:path*", destination: "http://localhost:4000/api/:path*" },
    ];
  },
};
module.exports = nextConfig;