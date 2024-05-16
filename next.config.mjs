/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["localhost"],
  // },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://147.139.135.195:8090/api/:path*", // Ganti dengan URL server Anda
      },
    ];
  },
};

export default nextConfig;
