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
import React, { useState } from "react";

function CreateWalletWithEmail() {
  // User props.
  const [emailAddress, setEmailAddress] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  const { connectWallet } = useWeb3();

  const handleLogin = async () => {
    connectWallet("magic", { email: emailAddress });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create Spark Account
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
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleLogin}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default CreateWalletWithEmail;
