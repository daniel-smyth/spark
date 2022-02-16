import {
  Heading,
  Stack,
  Text,
  useMediaQuery,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function ArtCollectionInfo() {
  const [isDesktopOrLaptop] = useMediaQuery("(min-width: 1224px)");
  const [isBigScreen] = useMediaQuery("(min-width: 1824px)");
  const [isTabletOrMobile] = useMediaQuery("(max-width: 1224px)");
  const [isPortrait] = useMediaQuery("(orientation: portrait)");
  const [isRetina] = useMediaQuery("(min-resolution: 2dppx)");

  return (
    <Stack spacing={{ base: 7, md: 5 }}>
      <Text
        textTransform={"uppercase"}
        color={"blue.400"}
        fontWeight={600}
        fontSize="sm"
        bg={useColorModeValue("blue.50", "blue.900")}
        p={2}
        alignSelf={"flex-start"}
        rounded={"md"}
      >
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

      <Text color={"gray.500"} fontSize="lg">
        <Stack>
          <span style={{ color: "black", fontWeight: "600" }}>
            Worried your NFTs won't sell?
          </span>
          <Text>
            If you don't make sales you don't pay us. We only get a royalty
            percentage of sales.Pick your package and create your first NFT
            collection.
          </Text>
        </Stack>
      </Text>
    </Stack>
  );
}

export default ArtCollectionInfo;
