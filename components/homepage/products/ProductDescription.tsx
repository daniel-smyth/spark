import React from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";

/**
 * Renders a production description component with text and image.
 *
 * @returns product description component
 */
function ProductDescription() {
  return (
    <Stack
      spacing={{ base: 7, md: 5 }}
      alignItems={{ base: "flex-start", md: "center" }}
    >
      <Text variant="badge">Create NFT Art Collection</Text>

      <Heading fontSize={{ base: "2xl", md: "3xl" }}>
        Create Art Collection
      </Heading>
      <Stack alignItems={"center"} spacing={0.5}>
        <Text size="lg">Just connect your wallet and you're ready.</Text>
        <Text size="lg">
          Have your own artwork? Upload and mint on the next page.
        </Text>
        <Text size="lg">
          Needing some artwork? You can fill out a artwork request on the next
          page.
        </Text>
      </Stack>
    </Stack>
  );
}

export default ProductDescription;
