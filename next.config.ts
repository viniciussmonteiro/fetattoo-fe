/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.example.com"
      },
      {
        protocol: "https",
        hostname: "cdn.mock.local"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000"
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000"
      }
    ]
  }
};

export default nextConfig;
