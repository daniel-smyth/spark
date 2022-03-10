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
  Link,
} from "@chakra-ui/react";
import { FaObjectGroup, FaShippingFast } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { ReactElement } from "react";
import ProductPrice from "./products/ProductPrice";

/**
 * Component with text, bulletpoints, image explaining the business
 * process.
 *
 * @returns what we do component
 */
export default function BusinessInfo() {
  return (
    <Container maxW="6xl" spacing={{ base: 8, md: 8 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        px={{ base: 5 }}
        pb={{ base: 16, md: 36 }}
      >
        <Stack spacing={7}>
          <Text alignSelf={"flex-start"} variant={"badge"}>
            About
          </Text>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            How does it work?
          </Heading>
          <Text size="sm">
            Just upload your artwork and spark will handle the rest. Don’t have
            artwork? Let our team hook you up with one of our recommended 3D art
            renders.
          </Text>
          <Link textDecoration={"underline"} color={"blue.600"} pb={4}>
            How much artwork do I need to create 10,000 NFTs?
          </Link>
          <Stack
            spacing={3}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={FaObjectGroup} color={"#1B486D"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"1. Spark designs NFTs"}
            />
            <Feature
              icon={<Icon as={FaShippingFast} color={"#1B486D"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"2. Spark installs NFT marketplace"}
            />
            <Feature
              icon={<Icon as={BsShop} color={"#1B486D"} w={5} h={5} pb={0.5} />}
              iconBg={"#3199FF"}
              text={"3. You start selling"}
            />
          </Stack>
        </Stack>

        <Box display={"flex"} justifyContent={{ md: "right", base: "center" }}>
          <ProductPrice
            color="blue"
            displayRoyalty={true}
            packageName="Art collection"
            royalty="10"
            feature1="Up to 10,000 NFT images"
            feature2="5 minutes to create"
            feature3="$0 initial fees"
            feature4="Sold on Opensea"
            buttonText="Create Collection"
            link="/createcollection"
          ></ProductPrice>
        </Box>
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
