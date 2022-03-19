import { Container, Stack, useColorModeValue, Box } from "@chakra-ui/react";
import React from "react";

function CreateCollectionContainer({ children }: { children: any }) {
  return (
    <Container>
      <Stack py={8} px={6} bg={useColorModeValue("gray.50", "gray.800")}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          px={6}
          py={12}
        >
          {children}
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateCollectionContainer;
