import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAddress, useCoinbaseWallet, useDisconnect, useMetamask, useWalletConnect } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

/**
 * Renders simple form to sign in or create a wallet
 * using magic.
 *
 * @returns sign in component
 */
function LogIn(props: any) {
  // NextJS router
  const router = useRouter();

  // ThirdWeb and User props.
  const [emailAddress, setEmailAddress] = useState("");
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnectWallet = useDisconnect();
  const address = useAddress();

  // For button.
  const [isConnecting, setConnecting] = useState(false);

  // TODO Magic connector.
  // const connectMagic = async () => {
  //   setConnecting(true);
  //   connectWallet("magic", { email: emailAddress });
  // };

  // Route if user logged in.
  if (address) router.push(props.href);

  return (
    <Box rounded={"lg"}>
      <Stack spacing={4}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            backgroundColor={"white"}
            type="email"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </FormControl>
        <Stack pt={2}>
          {isConnecting ? (
            <Button
              isLoading
              loadingText="Connecting"
              size="md"
              variant="outline"
            >
              Connecting
            </Button>
          ) : (
            null
            // <Button onClick={connectMagic} size="md" variant="solid">
            //   Create Account
            // </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default LogIn;
