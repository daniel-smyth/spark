import React from "react";
import { Heading, Stack, Text, useMediaQuery, Image } from "@chakra-ui/react";

/**
 * Renders a production description component with text and image.
 *
 * @returns product description component
 */
function ProductDescription() {
  const [isDesktopOrLaptop] = useMediaQuery("(min-width: 1224px)");
  const [isBigScreen] = useMediaQuery("(min-width: 1224px)");
  return (
    <Stack spacing={{ base: 7, md: 5 }}>
      <Text variant="badge" alignSelf={"flex-start"}>
        Create NFT
      </Text>

      <Heading fontSize={{ base: "2xl", md: "3xl" }}>
        NFT Art Collection
      </Heading>

      {isDesktopOrLaptop || isBigScreen ? (
        <Image
          rounded={"xl"}
          alt={"feature image"}
          src={"/boredapecollage.jpg"}
          objectFit={"cover"}
        />
      ) : null}

      <Text size="lg">
        <Stack>
          <Text variant="bold">Worried your NFTs won't sell?</Text>
          <Text>
            If you don't make sales you don't pay us. We only get a royalty
            percentage of sales. Pick your package and create your first NFT
            collection.
          </Text>
        </Stack>
      </Text>
    </Stack>
  );
}

export default ProductDescription;
