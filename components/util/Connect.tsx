import React, { useEffect, useState } from "react";
import { useAddress, useMetamask, useWalletConnect } from "@thirdweb-dev/react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { isMobile, isTablet } from "react-device-detect";

export default function Connect() {
  const [eth, setEth] = useState(true);
  const address = useAddress();
  const connectWithWalletConnect = useWalletConnect();

  useEffect(() => {
    const interval = setInterval(() => check(), 100);
    return () => clearInterval(interval);
  }, []);

  function check() {
    if (typeof window.ethereum == "undefined") setEth(false);
  }

  function connectMetaMask() {
    if (eth) useMetamask();
    else window.open("https://metamask.io/", "_blank")!.focus();
  }

  function connectCoinbase() {
    if (eth) useMetamask();
    else window.open("https://www.coinbase.com/wallet", "_blank")!.focus();
  }

  function openMetamask() {
    window.open("https://metamask.app.link/dapp/spark3.io/", "_blank")!.focus();
  }

  function openWalletconnect() {
    window
      .open("https://docs.walletconnect.com/mobile-linking", "_blank")!
      .focus();
  }

  return (
    <Box align="center">
      <Flex
        width={{ base: "none", md: "400px" }}
        bg="gray.50"
        borderRadius="16px"
        direction="column"
        padding={{ base: "none", md: "20px" }}
        py={6}
      >
        <Box p={2}>
          {address ? (
            <Stack spacing={4}>
              <Text>Loading...</Text>
            </Stack>
          ) : (
            <>
              {!eth ? (
                isTablet || isMobile ? null : (
                  <Button
                    mb="8px"
                    variant={eth ? "solid" : "outline"}
                    isFullWidth
                    iconSpacing="auto"
                    rightIcon={
                      <AspectRatio ratio={1} w={6}>
                        <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
                      </AspectRatio>
                    }
                    onClick={openMetamask}
                  >
                    Create Wallet
                  </Button>
                )
              ) : (
                <>
                  <Button
                    mb="8px"
                    variant={eth ? "solid" : "outline"}
                    isFullWidth
                    iconSpacing="auto"
                    rightIcon={
                      <AspectRatio ratio={1} w={6}>
                        <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
                      </AspectRatio>
                    }
                    onClick={() => connectMetaMask()}
                  >
                    MetaMask
                  </Button>
                  <Button
                    mb="8px"
                    isFullWidth
                    variant={eth ? "solid" : "outline"}
                    iconSpacing="auto"
                    rightIcon={
                      <AspectRatio ratio={1} w={6}>
                        <Image src="https://thirdweb.com/logos/coinbase-wallet-logo.svg" />
                      </AspectRatio>
                    }
                    onClick={() => connectCoinbase()}
                  >
                    Coinbase Wallet
                  </Button>
                </>
              )}
              <Button
                variant="solid"
                isFullWidth
                iconSpacing="auto"
                rightIcon={
                  <AspectRatio ratio={1} w={6}>
                    <Image src="https://thirdweb.com/logos/walletconnect-logo.svg" />
                  </AspectRatio>
                }
                onClick={() => connectWithWalletConnect()}
              >
                WalletConnect
              </Button>
              {isMobile || isTablet ? (
                <>
                  <Text pt={4} py={4} size={"md"}>
                    You're on mobile{" "}
                  </Text>
                  <Text pb={1} size={"md"}>
                    Metamask has an
                    <Link color={"blue.400"} onClick={openMetamask}>
                      {" "}
                      app
                    </Link>{" "}
                    you can use with{" "}
                    <Link color={"blue.400"} onClick={openWalletconnect}>
                      {" "}
                      WalletConnect
                    </Link>{" "}
                    or use a desktop for Metamask Chrome or Coinbase wallets.
                  </Text>
                  <Box pt={5}>
                    <AspectRatio ratio={1} w={5} h={5}>
                      <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
                    </AspectRatio>
                  </Box>
                </>
              ) : (
                <Text pt={4} align={"center"} size={"md"}>
                  No wallet?{" "}
                  <Link color={"blue.400"} onClick={openMetamask}>
                    Create wallet
                  </Link>
                </Text>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
