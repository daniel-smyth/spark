import { Container, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function FormBackground({ children }: { children: any }) {
  return (
    <Container display={"flex"}>
      <Stack
        spacing={6}
        py={10}
        px={10}
        align={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        {children}
      </Stack>
    </Container>
  );
}

export default FormBackground;
