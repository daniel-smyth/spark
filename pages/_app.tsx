import { ThirdwebProvider } from "@3rdweb/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";
import "../styles/globals.css";

/**
 * * APP
 * Thirdweb provider, Navbar and Footer.
 * App wrapped in Thirdweb provider with magi API key anf support
 * key chains. The chians of the coins you would like to accept.
 */

function MyApp({ Component, pageProps }: AppProps) {
  // Ethereum chain IDs of chains you want to support.
  const supportedChainIds = [1, 4, 137];

  /**
   * Connects you want to support:
   * injected - MetaMask.
   * magic - Magic Link.
   * walletconnect - Wallet Connect.
   * walletlink - Coinbase Wallet.
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
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      {/* HEADER  */}
      <Head>
        <title>Spark</title>
        <meta name="description" content="Stay hungry, stay foolish." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAVBAR */}
      <NavBar />

      {/* COMPONENT */}
      <Component {...pageProps} />

      {/* FOOTER  */}
      <Footer />
    </ThirdwebProvider>
  );
}

export default MyApp;
