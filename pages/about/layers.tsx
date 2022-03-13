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
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FiImage, FiDatabase, FiRepeat } from "react-icons/fi";

export default function LayersInfo() {
  return (
    <Container maxW="6xl" spacing={{ base: 8, md: 8 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        px={{ base: 5 }}
        pb={{ base: 16, md: 36 }}
      >
        <Stack spacing={{ base: 7, md: 9 }}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            What are traits?
          </Heading>
          <Text size="sm">
            Create an NFT collection in minutes thanks to Spark3's randomising
            art engine and the latest advancements in Web3 technology.
          </Text>
          <Text>
            Calculate your required layers and traits above and you are ready to
            start
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
              icon={<Icon as={FiImage} color={"#1B486D"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"1. Mutliply images"}
            />
            <Feature
              icon={<Icon as={FiDatabase} color={"#1B486D"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"2. Mint to exchange"}
            />
            <Feature
              icon={
                <Icon as={FiRepeat} color={"#1B486D"} w={5} h={5} pb={0.5} />
              }
              iconBg={"#3199FF"}
              text={"3. Sell"}
            />
          </Stack>
        </Stack>
        <Stack>
          <Text size="sm">
            Create an NFT collection in minutes thanks to Spark3's randomising
            art engine and the latest advancements in Web3 technology.
          </Text>
          <Text>
            Calculate your required layers and traits above and you are ready to
            start
          </Text>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

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
