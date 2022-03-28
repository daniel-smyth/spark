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
  useMediaQuery,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import ProductPrice from "../Price";
import { FiImage, FiDatabase, FiRepeat } from "react-icons/fi";
import { useRouter } from "next/router";

/**
 * Component with text, bulletpoints, image explaining the business
 * process.
 *
 * @returns what we do component
 */
export default function HowItWorks() {
  const router = useRouter();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  function handleClick() {
    router.push("/create/getstarted");
  }

  return (
    <Container maxW="6xl" px={12} spacing={{ base: 8, md: 8 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        pb={{ base: 16, md: 36 }}
      >
        {isLargerThan480 ? null : (
          <Heading
            display={{ base: "inline", md: "none" }}
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            How does it work?
          </Heading>
        )}
        <Box display={{ base: "none", md: "flex" }}>
          <ProductPrice
            color="blue"
            displayRoyalty={true}
            packageName="Art collection"
            royalty="202"
            feature1="Only minting fees"
            feature2="Compatiable with Opensea"
            feature3="Up to 10,000 NFTs"
            feature4="5 minute setup"
            buttonText="Create Collection"
            link="/create/getstarted"
          ></ProductPrice>
        </Box>
        <Stack spacing={{ base: 7, md: 9 }} pt={{ base: 0, md: 5 }}>
          {!isLargerThan480 ? null : (
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>
              How does it work?
            </Heading>
          )}

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
              iconBg={"blue.500"}
              text={"1. Upload & Mutliply images"}
            />
            <Text size="sm">
              Upload your NFT artwork and Spark3 will multiply the images.
            </Text>
            <Feature
              icon={<Icon as={FiDatabase} color={"white"} w={5} h={5} />}
              iconBg={"blue.500"}
              text={"2. Mint to exchange"}
            />
            <Text size="sm">
              Mint images directly to an address of your choice. Wallet or
              exchange.
            </Text>
            <Feature
              icon={<Icon as={FiRepeat} color={"white"} w={5} h={5} pb={0.5} />}
              iconBg={"blue.500"}
              text={"3. Sell"}
            />
            <Text size="sm">Sell your new NFT artwork.</Text>
            {isLargerThan480 ? null : (
              <Flex py={4}>
                <Button
                  minW={"100%"}
                  onClick={handleClick}
                  size={"md"}
                  variant={"solid"}
                >
                  Create Collection
                </Button>
              </Flex>
            )}
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
      <Text color={"black"} variant="bold">
        {props.text}
      </Text>
    </Stack>
  );
};

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}
