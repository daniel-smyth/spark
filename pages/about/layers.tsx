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
  Button,
  Link,
  Box,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FiDatabase, FiFolder, FiUpload } from "react-icons/fi";
import Script from "next/script";

export default function LayersInfo() {
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
            What are layers?
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
              iconBg={"#3199FF"}
              text={"1. Layers are traits"}
            />
            <Flex>
              <Box display={{ base: "none", md: "block" }} py={2} px={8}>
                <Image
                  shadow={"lg"}
                  alignSelf={"center"}
                  width={"320px"}
                  h={"137px"}
                  src="/layersScreenshot.jpg"
                ></Image>
              </Box>
              <Text>
                Layers are like{" "}
                <span style={{ fontStyle: "italic" }}>folders</span> containing
                artwork <span style={{ fontStyle: "italic" }}>traits</span>. A
                collection can have many{" "}
                <span style={{ fontStyle: "italic" }}>layers</span> to increase
                collection size and style.
                <br />
                <br />
                BoredApes have a{" "}
                <span style={{ fontStyle: "italic" }}>layer</span> (or{" "}
                <span style={{ fontStyle: "italic" }}>trait</span>), "hat", with
                variations like "Trippy Captain's Hat" and "King's Crown."
                <br />
                <br />
                Left there are two{" "}
                <span style={{ fontStyle: "italic" }}>layers</span> /{" "}
                <span style={{ fontStyle: "italic" }}>traits</span>. Background
                and hat.
              </Text>
            </Flex>
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
            <Stack py={2} px={{ base: "none", md: 8 }} spacing={5}>
              <Text>
                When uploading images Spark3 will detect the layer name from the
                image. We handle the rest including NFT metadata..
              </Text>
              <Text variant={"bold"} size="md">
                "LAYERNAME_IMAGENAME.png"
              </Text>
              <Text pt={1} size={"md"}>
                Ready to start?{" "}
                <Link color={"blue.400"} href="/createcollection/create">
                  Upload layers
                </Link>
              </Text>
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
                display={{ base: "none", md: "block" }}
                py={2}
                px={8}
                minW={"500px"}
                alignSelf={"center"}
              >
                <Image shadow={"md"} src="/layers.jpg"></Image>
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
