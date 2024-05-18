/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    // domains: ["147.139.135.195"],
  },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3008/api/:path*", // Ganti dengan URL server Anda
      },
    ];
  },
};

export default nextConfig;
