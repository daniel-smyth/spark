'use client';

import './globals.css';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { Navbar } from '@components/common';

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

// Get application domain URL for Thirdweb provider
if (!process.env.NEXT_PUBLIC_DOMAIN) {
  throw new Error('Please include your NEXT_PUBLIC_DOMAIN URL in .env');
}

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThirdwebProvider
          desiredChainId={activeChainId}
          authConfig={{
            domain,
            authUrl: '/api/auth',
            loginRedirect: '/'
          }}
        >
          <Navbar />
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}