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
import { FiImage, FiDatabase, FiUpload } from "react-icons/fi";

export default function TraitsInfo() {
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
            What are traits?
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
              icon={<Icon as={FiImage} color={"white"} w={5} h={5} />}
              iconBg={"blue.400"}
              text={"1. Traits make the image"}
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
              <Text maxW={"70%"}>
                Traits are the parts that make the image. Some examples of trait
                categories can be a jacket, hat, facial expression, and what the
                character is holding in their mouth. Each category would then
                have a certain number of unique traits, which are more specific,
                and each unique trait would appear a certain number of times in
                the NFT collection.
                <br />
                <br />
                On the left the{" "}
                <span style={{ fontStyle: "italic" }}>trait</span> background
                has two unique variations: black and red.
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
              iconBg={"blue.400"}
              text={"2. How do I upload traits?"}
            />
            <Stack py={2} px={{ base: "none", md: 8 }} spacing={5}>
              <Text>
                When uploading images Spark3 will detect the trait variation
                from the image. We handle the rest including NFT metadata..
              </Text>
              <Text variant={"bold"} size="md">
                "LAYERNAME_TRAITNAME.png"
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
                Trait names are added to the NFT Metadata and displayed on
                exchanges like OpenSea. Each trait type then has a certain
                number of unique examples, which are more specific, and each
                unique trait would appear a certain number of times in the NFT
                collection.
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
