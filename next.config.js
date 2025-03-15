/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-image-domain.com"], // Add your image hosting domain
    unoptimized: process.env.NODE_ENV === "development",
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

module.exports = nextConfig;
