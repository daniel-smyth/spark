import { Stack, Spinner, Text } from "@chakra-ui/react";
import React from "react";

function Reject() {
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
        <Text size="lg">No wallet connected.</Text>
        <Text size="md">
          Please use the connect wallet button in the navigation bar.
        </Text>
      </Stack>
    </Stack>
  );
}

export default Reject;
