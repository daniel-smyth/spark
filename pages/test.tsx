import { Box, Container, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import React from "react";

function Test() {
  return (
    <Stack
      minH={"50vh"}
      spacing={8}
      py={10}
      alignItems="center"
      justifyContent={"center"}
    >
      <Spinner color={"blue.500"} />
      <Stack alignItems="center">
        <Text size="lg">Creating images.</Text>
        <Text size="md">This will take a couple of seconds.</Text>
      </Stack>
    </Stack>
  );
}

export default Test;
