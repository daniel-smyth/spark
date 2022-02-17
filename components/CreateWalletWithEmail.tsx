import { useWeb3 } from "@3rdweb/hooks";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function CreateWalletWithEmail() {
  // NextJS router
  const router = useRouter();

  // ThirdWeb and User props.
  const [emailAddress, setEmailAddress] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const { address, connectWallet } = useWeb3();

  // Connectors.
  const connectMagic = async () => {
    connectWallet("magic", { email: emailAddress });
  };
  const connectMetaMask = async () => {
    connectWallet("injected");
  };

  // Route if user logged in.
  if (address) router.push("/artcollection");

  return (
    <Flex
      py={2}
      pb={6}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} py={12}>
        <Stack align={"center"}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} textAlign={"center"}>
            Create account
          </Heading>
        </Stack>
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
              <Button
                onClick={connectMagic}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Create Wallet
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link onClick={connectMagic} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default CreateWalletWithEmail;
