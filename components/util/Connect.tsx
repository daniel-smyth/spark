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

  function handleClick() {
    window.open("https://metamask.io/", "_blank")!.focus();
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
              <Text pt={4} align={"center"} size={"md"}>
                No wallet?{" "}
                <Link color={"blue.400"} onClick={handleClick}>
                  Create wallet
                </Link>
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
