/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
  experimental: {
    appDir: true
    // serverComponentsExternalPackages: ['@thirdweb-dev/react', 'canvas']
    // runtime: 'experimental-edge' // 'node.js' (default) | 'experimental-edge'
  }
  // transpilePackages: ['@thirdweb-dev/react', 'canvas']
};

module.exports = nextConfig;
