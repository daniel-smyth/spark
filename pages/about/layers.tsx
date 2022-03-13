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
  Image,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FiDatabase, FiFolder, FiUpload } from "react-icons/fi";
import Script from "next/script";

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
            What are layers?
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
              icon={<Icon as={FiFolder} color={"white"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"1. Layers are traits"}
            />
            <Text size="sm">
              Think of layers as folders which contain your artwork's traits.
              The layer name you provider will be the trait name in the NFT. For
              example, BoredApes have a trait (or layer) called "hat". The hat
              then has different traits, or images, with names like "Trippy
              Captain's Hat" and "King's Crown."
            </Text>
          </Stack>
          <Stack
            spacing={3}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={FiUpload} color={"white"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"2. How do I upload layers?"}
            />
            <Stack spacing={3}>
              <Text>
                When you are uploading images to Spark3 it will detect the layer
                name from the name of the image. We handle the rest.
              </Text>
              <Text variant={"bold"} size="md">
                "LAYERNAME_IMAGENAME.png"
              </Text>
              <Text size="md">"Background_blue.png"</Text>
              <Text size="md">"Hat_redFedora.png"</Text>
            </Stack>
          </Stack>
          <Stack
            spacing={3}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={FiDatabase} color={"white"} w={5} h={5} pb={0.5} />
              }
              iconBg={"#3199FF"}
              text={"3. Layer names are add as traits to NFT metadata"}
            />
            <Text size="sm">
              Layer names are detected and added to Metadata to display on
              exchanges like OpenSea.
            </Text>
            <Image src="/layers.jpg"></Image>
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
