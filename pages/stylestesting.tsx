import { Button, Text, Stack, Heading } from "@chakra-ui/react";
import React from "react";

function StyleTest() {
  return (
    <div>
      <Stack spacing={8} p={8}>
        <Heading>Heading</Heading>
        <Text>Text</Text>
        <span style={{ color: "black", fontWeight: "600" }}>Bold Text</span>
        <Text
          textTransform={"uppercase"}
          color={"blue.400"}
          fontWeight={600}
          fontSize="sm"
          bg={"blue.50"}
          p={2}
          alignSelf={"flex-start"}
          rounded={"md"}
        >
          Create NFT
        </Text>
        <Button size="sm" variant="solid">
          Click me
        </Button>
        <Button size="sm" variant="outline">
          Click me
        </Button>
        <Button size="md" variant="solid">
          Click me
        </Button>
        <Button size="md" variant="outline">
          Click me
        </Button>
      </Stack>
    </div>
  );
}

export default StyleTest;
