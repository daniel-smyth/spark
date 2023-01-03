/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@thirdweb-dev/react']
    // runtime: 'experimental-edge' // 'node.js' (default) | 'experimental-edge'
  },
  transpilePackages: ['@thirdweb-dev/react']
};

module.exports = nextConfig;
