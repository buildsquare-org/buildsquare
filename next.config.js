/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
