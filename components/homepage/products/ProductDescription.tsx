import React from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";

/**
 * Renders a production description component with text and image.
 *
 * @returns product description component
 */
function ProductDescription() {
  return (
    <Stack spacing={{ base: 7, md: 5 }}>
      <Text variant="badge" alignSelf={"flex-start"}>
        Create NFT Art Collection
      </Text>

      <Heading fontSize={{ base: "2xl", md: "3xl" }}>
        Create Art Collection
      </Heading>

      <Text size="lg">
        <Stack>
          <Text>
            Just connect your wallet and you're ready. Have your own artwork?
            Upload and mint on the next page. Needing some artwork? You can fill
            out a artwork request on the next page.
          </Text>
        </Stack>
      </Text>
    </Stack>
  );
}

export default ProductDescription;
