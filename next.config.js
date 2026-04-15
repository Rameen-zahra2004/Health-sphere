/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // enables React strict mode
  swcMinify: true, // use SWC for faster minification
  experimental: {
    // you can add experimental features here if needed
  },
  typescript: {
    // If you want to prevent TypeScript errors from blocking dev
    ignoreBuildErrors: false, // set to true to ignore TS errors during dev
  },
};

module.exports = nextConfig;
