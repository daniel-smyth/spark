import { ThirdwebProvider } from "@3rdweb/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * * THIRD WEB
   */

  // Put the ethereum chain ids of the chains you want to support
  const supportedChainIds = [1, 4, 137];

  /**
   * Include the connectors you want to support
   * injected - MetaMask
   * magic - Magic Link
   * walletconnect - Wallet Connect
   * walletlink - Coinbase Wallet
   */
  const connectors = {
    injected: {},
    magic: {
      apiKey: "pk_live_F98DE7399C04A86A", // Your magic api key
      chainId: 1, // The chain ID you want to allow on magic
    },
    walletconnect: {},
    walletlink: {
      appName: "thirdweb - demo",
      url: "https://thirdweb.com",
      darkMode: false,
    },
  };

  /**
   * * RENDER
   */
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Head>
        <title>Spark</title>
        <meta name="description" content="Stay hungry, stay foolish." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <Component {...pageProps} />
      <Footer />
    </ThirdwebProvider>
  );
}

export default MyApp;
