/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
    domains: ["shopify"],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
