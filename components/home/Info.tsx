import { useRouter } from "next/router";
import { ReactElement } from "react";
import { FiImage, FiDatabase, FiRepeat } from "react-icons/fi";
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
} from "@chakra-ui/react";
import ProductPrice from "../Price";

export default function HowItWorks() {
  const router = useRouter();

  function handleClick() {
    router.push("/create/getstarted");
  }

  return (
    <Container maxW="6xl" py={12} px={12} spacing={{ base: 8, md: 8 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        pb={{ base: 16, md: 36 }}
      >
        <Box display={{ base: "none", md: "flex" }}>
          <ProductPrice
            color="blue"
            displayRoyalty={true}
            packageName="NFT Collection"
            royalty="99"
            feature1="Multiply and sell artwork on exchanges"
            feature2="Unlimited artwork collection size"
            feature3="Setup completed in 5 minutes"
            feature4="No downloads."
            buttonText="Create Collection"
            link="/create/getstarted"
          ></ProductPrice>
        </Box>
        <Stack spacing={{ base: 8, md: 9 }} pt={{ base: 0, md: 5 }}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            How does it work?
          </Heading>

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
              text={"1. Mutliply Artwork"}
            />
            <Text size="sm">
              Multiply your images with the Spark3 art engine
            </Text>
            <Feature
              icon={<Icon as={FiDatabase} color={"white"} w={5} h={5} />}
              iconBg={"blue.500"}
              text={"2. Mint Artwork"}
            />
            <Text size="sm">
              Mint your new images directly to an address of your choice
            </Text>
            <Feature
              icon={<Icon as={FiRepeat} color={"white"} w={5} h={5} pb={0.5} />}
              iconBg={"blue.500"}
              text={"3. Sell Artwork"}
            />
            <Text size="sm">
              Sell your newly created NFT Artwork on any major exchange
            </Text>
            <Box py={8}>
              <Button
                minW={"100%"}
                onClick={handleClick}
                size={"md"}
                variant={"solid"}
                display={{ base: "flex", md: "none" }}
              >
                Create Collection
              </Button>
            </Box>
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
