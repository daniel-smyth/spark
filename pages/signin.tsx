import {
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import LogIn from "../components/LogIn";

/**
 * Renders the sign in with magic form.
 *
 * @returns sign in page
 */
function SignIn() {
  return (
    <Container py={10}>
      <Stack
        spacing={6}
        py={10}
        pb={25}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack align={"center"}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} textAlign={"center"}>
            Create account
          </Heading>
        </Stack>
        <LogIn />
      </Stack>
    </Container>
  );
}

export default SignIn;
