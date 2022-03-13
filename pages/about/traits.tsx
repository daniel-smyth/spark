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
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FiImage, FiDatabase, FiRepeat } from "react-icons/fi";

export default function TraitsInfo() {
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
              icon={<Icon as={FiImage} color={"#1B486D"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"1. Layers contain artwork traits"}
            />
            <Text size="sm">
              Layers are folders which contain the images for your artwork. The
              name for of you layer will be the name of the trait for the
              artwork. For example, BoredApes have a trait (or layer) called
              "hat". The hat then has different traits, or images, with names
              like "Trippy Captain's Hat" and "King's Crown."
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
              icon={<Icon as={FiDatabase} color={"#1B486D"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"2. Spark3 detects layer names from the image name"}
            />
            <Text>
              When you are uploading images to Spark3 it will detect the layer
              name from the name of the image. We handle the rest.
            </Text>
          </Stack>
          <Stack spacing={6}>
            <Text variant={"bold"} size="md">
              "LAYERNAME_IMAGENAME.png"
            </Text>
            <Text size="md">
              "Background_blue.png"{<br />}"Hat_redFedora.png"
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
              icon={
                <Icon as={FiRepeat} color={"#1B486D"} w={5} h={5} pb={0.5} />
              }
              iconBg={"#3199FF"}
              text={"3. Spark3 adds layers as traits to NFT metadata"}
            />
            <Text size="sm">
              Layer names are detected and added to Metadata to display on
              exchanges like OpenSea.
            </Text>
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
