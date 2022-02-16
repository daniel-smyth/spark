import { Heading } from "@3rdweb/react/node_modules/@chakra-ui/layout";
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import PricingCard from "../components/PricingCard";
import { FaObjectGroup } from "react-icons/fa";

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
  return (
    <Container
      maxW="6xl"
      spacing={{ base: 8, md: 8 }}
      pt={{ base: 16, md: "80px" }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }}></SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} px={{ base: 5 }}>
        {/* Top text block. */}
        <Stack spacing={4}>
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
            Start for Free
          </Heading>

          <Text color={"gray.500"} fontSize="lg">
            Worried your NFTs won't sell? Don't worry, if you don't make sales
            you don't pay us. We just get a royalty percentage of sales.
          </Text>

          <Text color={"gray.500"} fontSize="lg">
            Pick your package and create your first NFT collection.
          </Text>
        </Stack>

        {/* Art collection price card. */}
        <PricingCard
          displayRoyalty={true}
          color="blue"
          packageName="NFT Art collection"
          royalty="10"
          feature1="Quick."
          feature2="Fast."
          feature3="Simple."
          feature4="Free."
          buttonText="Start now"
        ></PricingCard>
      </SimpleGrid>

      {/* Coming soon introducation. */}
      <Stack spacing={{ base: 10, md: 7 }} px={{ base: 5 }}>
        <br />
        <Stack spacing={2}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>Coming Soon</Heading>
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
        <Heading fontSize={{ base: "2xl", md: "3xl" }}>New Packages</Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
          <PricingCard
            color="grey"
            displayRoyalty={false}
            packageName="NFT Data Packs"
            royalty="5"
            feature1="Quick."
            feature2="Fast."
            feature3="Simple."
            feature4="Free."
            buttonText="Learn More"
          ></PricingCard>
          <PricingCard
            color="grey"
            displayRoyalty={false}
            packageName="NFT Marketplaces"
            royalty="5"
            feature1="Quick."
            feature2="Fast."
            feature3="Simple."
            feature4="Free."
            buttonText="Learn More"
          ></PricingCard>
          <PricingCard
            color="grey"
            displayRoyalty={false}
            packageName="Custom NFTs"
            royalty="5"
            feature1="Quick."
            feature2="Fast."
            feature3="Simple."
            feature4="Free."
            buttonText="Learn More"
          ></PricingCard>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default CreateYourNft;
