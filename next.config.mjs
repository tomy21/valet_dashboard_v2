/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["localhost"],
    domains: ["dev-valetapi.skyparking.online"],
  },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dev-valetapi.skyparking.online/api/:path*", // Ganti dengan URL server Anda
      },
    ];
  },
};

export default nextConfig;
