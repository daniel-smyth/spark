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
        py={10}
        px={{ base: 3, md: 14 }}
        bg={useColorModeValue("gray.50", "gray.800")}
        minW={"100%"}
      >
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <SimpleGrid w={"100%"} columns={2} pb={8}>
            <Heading size="md">{props.title}</Heading>
            <Box pl={20}>
              <Spark3Black width={60} />
            </Box>
          </SimpleGrid>
          {children}
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateCollectionContainer;
