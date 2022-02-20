import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@3rdweb/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // Ethereum chain IDs of chains you want to support.
  const supportedChainIds = [1, 4, 137];

  const connectors = {
    injected: {}, // Metamask.
    magic: {
      apiKey: "pk_live_202FF20E4C57E3EA", // Your magic API key.
      chainId: 1, // The chain ID you want to allow on magic
    },
    walletconnect: {}, // Wallet connect.
    walletlink: {
      appName: "thirdweb - demo",
      url: "https://thirdweb.com",
      darkMode: false,
    }, // Coinbase.
  };

  const Text = {
    baseStyle: {
      color: "gray.500",
    },
    // Two sizes: sm and md
    sizes: {
      lg: {
        fontSize: "lg",
      },
      xl: {
        fontSize: "xl",
      },
      "2xl": {
        fontSize: "2xl",
      },
    },
    variants: {
      bold: {
        color: "black",
        fontWeight: 600,
      },
      badge: {
        textTransform: "uppercase",
        color: "blue.400",
        fontWeight: 600,
        fontSize: "sm",
        bg: "blue.50",
        p: 2,
        px: 3,
        rounded: "md",
      },
    },
  };

  const Button = {
    // The styles all button have in common
    baseStyle: {
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    // Two sizes: sm and md
    sizes: {
      sm: {
        fontSize: "12px",
        padding: "16px",
        rounded: "2xl",
      },
      md: {
        fontSize: "16px",
        padding: "24px",
        rounded: "2xl",
      },
    },
    // Two variants: outline and solid
    variants: {
      outline: {
        border: "2px solid",
        borderColor: "blue.500",
      },
      solid: {
        bg: "blue.500",
        color: "white",
        _hover: {
          bg: "blue.400",
        },
      },
      none: {
        bg: "none",
        color: "none",
      },
    },
    // The default size and variant values
    defaultProps: {
      size: "md",
      variant: "outline",
    },
  };

  const theme = extendTheme({
    components: {
      Button,
      Text,
    },
  });

  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ChakraProvider theme={theme}>
        <Head>
          <title>Spark</title>
          <meta name="description" content="Stay hungry, stay foolish." />
          <link rel="icon" href="/sparkicon.svg" />
        </Head>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
