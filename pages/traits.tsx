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
  Link,
  Box,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FiDatabase, FiFolder, FiUpload } from "react-icons/fi";

export default function ImagesInfo() {
  function italic(string: string) {
    return <span style={{ fontStyle: "italic" }}>{string}</span>;
  }

  function bold(string: string) {
    return <span style={{ fontWeight: "650" }}>{string}</span>;
  }

  return (
    <Container maxW="6xl" py={16} spacing={{ base: 8, md: 8 }}>
      <SimpleGrid
        columns={{ base: 1, md: 1 }}
        spacing={10}
        px={{ base: 5 }}
        pb={{ base: 16, md: 36 }}
      >
        <Stack spacing={{ base: 7, md: 9 }}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            {"Layers & Traits"}
          </Heading>

          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={FiFolder} color={"white"} w={5} h={5} />}
              iconBg={"blue.400"}
              text={"1. Layers are trait groups"}
            />
            <SimpleGrid columns={{ base: 1, md: 2 }} py={2}>
              <Stack
                px={{ base: 0, md: 8 }}
                pb={{ base: 8, md: 0 }}
                maxW={"550px"}
                alignSelf={"center"}
              >
                <Image shadow={"md"} src="/layers.jpg"></Image>
                <Text pl={4} fontSize={"sm"}>
                  {italic("BoredApe traits/layers")}
                </Text>
              </Stack>
              <Text>
                {bold(
                  "Most NFTs require multiple layers which are stacked on top of each other to generate a final image of what you want. These are also called traits"
                )}
                . <br />
                <br />
                BoredApes have a layer (or trait), "background", with variations
                like "{italic("Army Green")}" and "{italic("New Punk Blue")}."
                <br />
                <br /> A collection can have many layers to increase collection
                size and style.
              </Text>
            </SimpleGrid>
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
              iconBg={"blue.400"}
              text={"2. How do I upload layers?"}
            />
            <SimpleGrid columns={{ base: 1, md: 2 }}>
              <Box pb={{ base: 8, md: 0 }} px={{ base: 0, md: 8 }}>
                <Image shadow={"lg"} src="/sampleCollection.jpg"></Image>
                <Text pt={2} pl={4} fontSize={"sm"}>
                  {italic(`Example with 4 layers`)}
                </Text>
              </Box>
              <Stack py={2} px={{ base: "none", md: 8 }} spacing={5}>
                <Text>
                  {bold("Spark3 will detect the layer name from the image")} .
                  We handle the rest including NFT metadata.
                </Text>
                <Text size="md">{bold(`"TRAITTYPE_TRAIT.png"`)}</Text>
                <Text pt={1} size={"md"}>
                  Ready to start?{" "}
                  <Link color={"blue.400"} href="/create">
                    Upload layers
                  </Link>
                </Text>
              </Stack>
            </SimpleGrid>
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
              iconBg={"blue.400"}
              text={"3. Layer names are add as traits to NFT metadata"}
            />
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              py={2}
              px={{ base: 0, md: 8 }}
              spacing={6}
            >
              <Text size="sm">
                Layer names are added to the NFT Metadata and displayed on
                exchanges like OpenSea. Each layer then has a certain number of
                unique traits, which are more specific, and each unique trait
                would appear a certain number of times in the NFT collection.
              </Text>
              <Flex
                py={2}
                px={{ base: 4, md: 8 }}
                maxW={{ base: "250px", md: "300px" }}
                alignSelf={"center"}
                justifySelf={"center"}
              >
                <Image src="/opensealogo.png"></Image>
              </Flex>
            </SimpleGrid>
          </Stack>
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
