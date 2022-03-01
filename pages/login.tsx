import { Container, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import LogInForm from "../components/LogIn";

/**
 * Renders the sign in with magic form.
 *
 * @returns sign in page
 */
function LogIn() {
  return (
    <Container>
      <Stack
        spacing={6}
        py={10}
        pb={20}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack align={"center"}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} textAlign={"center"}>
            Create account
          </Heading>
        </Stack>
        <LogInForm href="/web3/artcollectionform" />
      </Stack>
    </Container>
  );
}

export default LogIn;
