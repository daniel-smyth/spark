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
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
}

const nextConfig = {
  env: {
    PRIVATE_KEY:
      "bdf3e41eb576c009a5b444ae15b8df49d57080c2a64e3f30b82722ff33dd8f2d",
    NFT_STORAGE_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFYmUxNTBCMzQxQzdFMzMzQzNmQjg3MkVCQmYwQTJlMDlGMmJEMDgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTg3NDkxNTYwNSwibmFtZSI6IlByb2plY3RTcGFyayJ9.lqpPQha5PLo6WEQ4E3w90gfWYzStP0YIynPzgUe575k",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
