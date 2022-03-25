import React, { useState } from "react";
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
import {
  useAddress,
  useCoinbaseWallet,
  useDisconnect,
  useMetamask,
  useWalletConnect,
} from "@thirdweb-dev/react";

export default function Connect() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnect = useDisconnect();

  const [connectEmail, setConnectEmail] = useState(false);

  function handleClick() {
    setConnectEmail(!connectEmail);
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
              <Button
                isFullWidth
                onClick={disconnect}
                mt="8px"
                variant="outline"
                bg="white"
              >
                Disconnect
              </Button>
            </Stack>
          ) : (
            <>
              <Button
                mb="8px"
                variant="solid"
                isFullWidth
                iconSpacing="auto"
                rightIcon={
                  <AspectRatio ratio={1} w={6}>
                    <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
                  </AspectRatio>
                }
                onClick={() => connectWithMetamask()}
              >
                MetaMask
              </Button>
              <Button
                mb="8px"
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
              <Button
                variant="solid"
                isFullWidth
                iconSpacing="auto"
                rightIcon={
                  <AspectRatio ratio={1} w={6}>
                    <Image src="https://thirdweb.com/logos/coinbase-wallet-logo.svg" />
                  </AspectRatio>
                }
                onClick={() => connectWithCoinbaseWallet}
              >
                Coinbase Wallet
              </Button>
              <Text pt={6} align={"center"} size={"md"}>
                No wallet?{" "}
                <Link color={"blue.400"} onClick={handleClick}>
                  How to create one
                </Link>
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
