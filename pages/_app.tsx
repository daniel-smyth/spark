import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@3rdweb/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes/index";
import connectors from "../thirdweb/connectors";
import supportedChainIds from "../thirdweb/supportedwallets";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
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
    </ThirdwebProvider>
  );
}

export default MyApp;
