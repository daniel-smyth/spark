import React, { NextPage } from 'next';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import { ChakraProvider } from '@chakra-ui/react';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

import theme from '../theme/index';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <QueryClientProvider client={new QueryClient()}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Spark</title>
            <meta name="description" content="Stay hungry, stay foolish." />
            <link rel="icon" href="/favicon.png" />
          </Head>
          <NavBar />
          {getLayout(<Component {...pageProps} />)}
          <Footer />
        </ChakraProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
