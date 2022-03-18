import {
  Container,
  Stack,
  useColorModeValue,
  Box,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import Spark3Black from "../logo/spark3black";

function CreateCollectionContainer({ children }: { children: any }) {
  return (
    <Container display={"flex"}>
      <Stack
        spacing={6}
        py={14}
        px={{ base: 3, md: 14 }}
        bg={useColorModeValue("gray.50", "gray.800")}
        minW={"100%"}
      >
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          px={8}
          py={12}
        >
          {children}
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateCollectionContainer;
