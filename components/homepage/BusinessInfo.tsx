import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { FaObjectGroup, FaShippingFast } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { ReactElement } from "react";

/**
 * Component with text, bulletpoints, image explaining the business
 * process.
 *
 * @returns what we do component
 */
export default function BusinessInfo() {
  return (
    <Container
      maxW="6xl"
      spacing={{ base: 8, md: 8 }}
      pt={{ base: 16, md: "80px" }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} px={{ base: 5 }}>
        <Stack spacing={8}>
          <Text alignSelf={"flex-start"} variant={"badge"}>
            What we do
          </Text>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Quick and Simple
          </Heading>
          <Text size="sm">
            After we create your NFT collection you choose between Spark
            installing our custom NFT marketplace on your website or sell
            directly on the Spark website for free.
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

        <Flex>
          <Image
            display={{ base: "none", md: "block" }}
            rounded={"md"}
            alt={"feature image"}
            src={"/boredape.jpg"}
            objectFit={"cover"}
          />
        </Flex>
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
