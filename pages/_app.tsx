import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Head from "next/head";
import theme from "../themes/index";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedChains={[ChainId.Polygon, ChainId.Rinkeby, ChainId.Mainnet]}
      desiredChainId={ChainId.Mainnet}
    >
      <QueryClientProvider client={new QueryClient()}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Spark</title>
            <meta name="description" content="Stay hungry, stay foolish." />
            <link rel="icon" href="/favicon.png" />
          </Head>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
