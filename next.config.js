/** @type {import('next').NextConfig} */
// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

const nextConfig = {
  env: {
    PRIVATE_KEY:
      'bdf3e41eb576c009a5b444ae15b8df49d57080c2a64e3f30b82722ff33dd8f2d',
    NFT_STORAGE_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFYmUxNTBCMzQxQzdFMzMzQzNmQjg3MkVCQmYwQTJlMDlGMmJEMDgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTg3NDkxNTYwNSwibmFtZSI6IlByb2plY3RTcGFyayJ9.lqpPQha5PLo6WEQ4E3w90gfWYzStP0YIynPzgUe575k',
    ETHERSCAN_KEY: 'N3H11V853XBJANNP4FX8I7DYGDTWEV524M',
    STRIPE_SECRET_KEY:
      'sk_test_51IEUvvHReqVOLPLXx8GepM8YY853GTADRWLfXfEKrpkG0Zn7h6u3jA8iAtH4HHiHZLxvO4KDe1B8VTAdlLWTE9Cn00t9p47xAQ',
    STRIPE_PUBLISHABLE_KEY:
      'pk_test_51IEUvvHReqVOLPLXiKDe7ixq7lMHhDr4HCXjk6Fe5Ph62h4logTJ3UHrMqNnaGuHmcDlyL2FRiy89zGG5YQlOaQC00R9alGJbf',
    SPARK3_ADDRESS: '0x69C16A68315f06e9c3120F5739FBCdE647055d15'
  },
  reactStrictMode: true
};

module.exports = nextConfig;
