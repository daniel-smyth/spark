import Head from "next/head";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes/index";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedChains={[ChainId.Polygon, ChainId.Rinkeby, ChainId.Mainnet]}
      desiredChainId={ChainId.Mainnet}
    >
      <CookiesProvider>
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
      </CookiesProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
