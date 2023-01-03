'use client';

// Visit below link to see why module is imported with "use client"
// https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages

import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

const activeChainId = ChainId.Mainnet;

if (!process.env.NEXT_PUBLIC_DOMAIN) {
  throw new Error('Please include your NEXT_PUBLIC_DOMAIN URL in .env');
}

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      authConfig={{
        domain,
        authUrl: '/api/auth',
        loginRedirect: '/'
      }}
    >
      {children}
    </ThirdwebProvider>
  );
}
