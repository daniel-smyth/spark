import { useWeb3 } from "@3rdweb/hooks";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
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
  const [socialMedia, setSocialMedia] = useState("");
  const { address, connectWallet } = useWeb3();

  // For button.
  const [isConnecting, setConnecting] = useState(false);

  // Connectors.
  const connectMagic = async () => {
    setConnecting(true);
    connectWallet("magic", { email: emailAddress });
  };

  // Route if user logged in.
  if (address) router.push(props.href);

  return (
    <Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </FormControl>
          <FormControl id="socialmedia" isRequired>
            <FormLabel>Social media handle</FormLabel>
            <Input
              type="socialmedia"
              onChange={(e) => setSocialMedia(e.target.value)}
            />
          </FormControl>
          <Stack spacing={5} pt={2}>
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
              <Button onClick={connectMagic} size="md" variant="solid">
                Create Wallet
              </Button>
            )}
          </Stack>
          <Stack>
            <Text align={"center"} size={"md"}>
              Already a user?{" "}
              <Link onClick={connectMagic} color={"blue.400"}>
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default LogIn;
