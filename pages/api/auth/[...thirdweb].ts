import { ThirdwebAuth } from '@thirdweb-dev/auth/next';

// Get application domain URL for Thirdweb provider
if (!process.env.NEXT_PUBLIC_DOMAIN) {
  throw new Error('Please include your NEXT_PUBLIC_DOMAIN URL in .env');
}

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey: process.env.ADMIN_PRIVATE_KEY || '',
  domain
});

export default ThirdwebAuthHandler();
