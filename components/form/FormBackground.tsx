import { Container, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function FormBackground({ children }: { children: any }) {
  return (
    <Container display={"flex"}>
      <Stack
        spacing={6}
        py={10}
        px={14}
        bg={useColorModeValue("gray.50", "gray.800")}
        minW={"100%"}
      >
        {children}
      </Stack>
    </Container>
  );
}

export default FormBackground;
