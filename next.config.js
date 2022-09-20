/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
