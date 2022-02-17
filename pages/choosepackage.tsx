import { Heading } from "@3rdweb/react/node_modules/@chakra-ui/layout";
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import PricingCard from "../components/PricingCard";
import { FaObjectGroup } from "react-icons/fa";
import ArtCollectionInfo from "../components/ArtCollectionInfo";

// Coming soon text block interface.
interface ComingSoonCardProps {
  icon: any;
  feature: string;
}

// Coming soon text block.
function ComingSoonCard(props: ComingSoonCardProps) {
  const { icon, feature } = props;
  return (
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
      <Flex>
        <Icon as={icon} color={"#1B486D"} w={5} h={5} />
        <Text pl={"10px"}>{feature}</Text>
      </Flex>
    </Text>
  );
}

// * Render

function CreateYourNft() {
  const [isDesktopOrLaptop] = useMediaQuery("(min-width: 1224px)");
  const [isBigScreen] = useMediaQuery("(min-width: 1824px)");
  const [isTabletOrMobile] = useMediaQuery("(max-width: 1224px)");
  const [isPortrait] = useMediaQuery("(orientation: portrait)");
  const [isRetina] = useMediaQuery("(min-resolution: 2dppx)");

  return (
    <Container
      maxW="6xl"
      spacing={{ base: 8, md: 8 }}
      pt={{ base: 16, md: "80px" }}
      pb={{ base: 16, md: "80px" }}
    >
      {/* Art collection price card. */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} px={{ base: 5 }}>
        <ArtCollectionInfo />
        <Box display={"flex"} justifyContent={"right"}>
          <PricingCard
            displayRoyalty={true}
            color="blue"
            packageName="NFT Art collection"
            royalty="10"
            feature1="$0 set up cost."
            feature2="2 Days processing time."
            feature3="10,000 NFT images."
            feature4="Sold on Spark.com"
            buttonText="Create Collection"
            link="/signin"
          ></PricingCard>
        </Box>
      </SimpleGrid>

      {/* Coming soon introducation. */}
      <Stack spacing={{ base: 10, md: 14 }} px={{ base: 5 }}>
        <br />
        {isTabletOrMobile ? (
          <>
            <Stack spacing={2}>
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                Coming Soon
              </Heading>
              <Text color={"gray.500"} fontSize="lg">
                We're working hard to develop new ways to make NFTs.
              </Text>
            </Stack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3 }}>
              <ComingSoonCard icon={FaObjectGroup} feature="NFT data packs" />
              <ComingSoonCard icon={FaObjectGroup} feature="NFT Marketplaces" />
              <ComingSoonCard icon={FaObjectGroup} feature="Custom NFTs" />
            </SimpleGrid>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                w={{ base: "full", md: "sm" }}
                colorScheme={"blue"}
                bg={"blue.500"}
                rounded={"xl"}
                px={6}
                _hover={{
                  bg: "blue.600",
                }}
              >
                Learn more
              </Button>
            </Box>
          </>
        ) : null}

        {isTabletOrMobile ? (
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            In Development at Spark
          </Heading>
        ) : (
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            In Development at Spark
          </Heading>
        )}

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
          <PricingCard
            color="grey"
            displayRoyalty={true}
            packageName="NFT Data Packs"
            royalty="5"
            feature1="Quick."
            feature2="Fast."
            feature3="Simple."
            feature4="Free."
            buttonText="Learn More"
            link="/createartcollection"
          ></PricingCard>
          <PricingCard
            color="grey"
            displayRoyalty={true}
            packageName="NFT Marketplaces"
            royalty="5"
            feature1="Quick."
            feature2="Fast."
            feature3="Simple."
            feature4="Free."
            buttonText="Learn More"
            link="/createartcollection"
          ></PricingCard>
          <PricingCard
            color="grey"
            displayRoyalty={true}
            packageName="Custom NFTs"
            royalty="5"
            feature1="Quick."
            feature2="Fast."
            feature3="Simple."
            feature4="Free."
            buttonText="Learn More"
            link="/createartcollection"
          ></PricingCard>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default CreateYourNft;
