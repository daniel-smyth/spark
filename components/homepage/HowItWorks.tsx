import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import ProductPrice from "../products/ProductPrice";
import { FiImage, FiDatabase, FiRepeat } from "react-icons/fi";

/**
 * Component with text, bulletpoints, image explaining the business
 * process.
 *
 * @returns what we do component
 */
export default function HowItWorks() {
  return (
    <Container maxW="6xl" px={12} spacing={{ base: 8, md: 8 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        pb={{ base: 16, md: 36 }}
      >
        <Heading
          display={{ base: "inline", md: "none" }}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          How does it work?
        </Heading>
        <Box
          display={{ base: "none", md: "flex" }}
          justifyContent={{ md: "left", base: "center" }}
        >
          <ProductPrice
            color="blue"
            displayRoyalty={true}
            packageName="Art collection"
            royalty="5"
            feature1="10,000 NFTs"
            feature2="Compatiable with Opensea"
            feature3="Only minting fees"
            feature4="5 minute setup"
            buttonText="Create Collection"
            link="/getstarted"
          ></ProductPrice>
        </Box>
        <Stack spacing={{ base: 7, md: 9 }} pt={{ base: 0, md: 5 }}>
          <Heading
            display={{ base: "none", md: "inline" }}
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            How does it work?
          </Heading>
          <Text size="sm">
            Create an NFT collection in minutes thanks to Spark3's randomising
            art engine and the latest advancements in Web3 technology.
          </Text>
          <Stack
            spacing={3}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={FiImage} color={"white"} w={5} h={5} />}
              iconBg={"blue.400"}
              text={"1. Upload and multiply images"}
            />
            <Feature
              icon={<Icon as={FiDatabase} color={"white"} w={5} h={5} />}
              iconBg={"blue.400"}
              text={"2. Mint directly to exchange"}
            />
            <Feature
              icon={<Icon as={FiRepeat} color={"white"} w={5} h={5} pb={0.5} />}
              iconBg={"blue.400"}
              text={"3. Sell"}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

/**
 * Renders bullet point feature.
 *
 * @param props text, icon, background
 * @returns
 */
const Feature = (props: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={props.iconBg}
      >
        {props.icon}
      </Flex>
      <Text variant="bold">{props.text}</Text>
    </Stack>
  );
};

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}
