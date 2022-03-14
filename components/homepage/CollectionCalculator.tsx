import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Spark3Black from "../logo/spark3black";

function CollectionCalculator() {
  const router = useRouter();
  const [size, setSize] = useState(10000);
  const [traits, setTraits] = useState(10);
  const [layers, setLayers] = useState(4);

  function calculate(e: number, type: string) {
    let newSize = 0;
    if (type == "trait") newSize = Math.pow(e, layers);
    if (type == "layer") newSize = Math.pow(traits, e);
    setSize(newSize);
  }

  function handleNewTrait(e: number) {
    setTraits(e);
    calculate(e, "trait");
  }
  function handleNewLayer(e: number) {
    setLayers(e);
    calculate(e, "layer");
  }

  function createCollection() {
    router.push({
      pathname: "/getstarted",
      query: { size: size },
    });
  }

  return (
    <Container px={12} maxW="6xl" spacing={{ base: 8, md: 8 }}>
      <Heading
        display={{ base: "none", md: "inline" }}
        fontSize={{ base: "2xl", md: "3xl" }}
      >
        How many NFTs do you want?
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 7, md: 10 }}
        pb={{ base: 16, md: 36 }}
      >
        <Heading
          display={{ base: "inline", md: "none" }}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          How many NFTs do you want?
        </Heading>
        <Stack spacing={7}>
          <FormControl pt={2}>
            <FormLabel>Layers</FormLabel>
            <NumberInput
              value={layers}
              onChange={(e) => {
                handleNewLayer(Number(e));
              }}
            >
              <NumberInputField bg="white" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text pt={1} size={"md"}>
              What is a layer?{" "}
              <Link color={"blue.400"} href="/about/layers">
                Layers
              </Link>
            </Text>
          </FormControl>
          <FormControl>
            <FormLabel>Traits</FormLabel>
            <NumberInput
              value={traits}
              onChange={(e) => {
                handleNewTrait(Number(e));
              }}
            >
              <NumberInputField bg="white" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text pt={1} size={"md"}>
              What is a trait?{" "}
              <Link color={"blue.400"} href="/about/traits">
                Traits
              </Link>
            </Text>
          </FormControl>
        </Stack>

        <Box display={"flex"} justifyContent={"right"}>
          <Box
            maxW={"330px"}
            maxH={"190px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"xl"}
            overflow={"hidden"}
          >
            <Stack
              color={useColorModeValue("gray.800", "white")}
              align={"center"}
              p={4}
            >
              <Text variant="badge">Nft Collection size</Text>
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <Text color="black" fontSize={"4xl"} fontWeight={600}>
                  {size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
                <Text color={"gray.500"}>NFTs</Text>
              </Stack>
              <Stack
                direction={"row"}
                align={"center"}
                justify={"center"}
              ></Stack>
            </Stack>
            <SimpleGrid
              w={"100%"}
              columns={2}
              bg={useColorModeValue("gray.50", "gray.900")}
              px={4}
              py={2.5}
            >
              <Box display={"flex"}>
                <Spark3Black width={60} />
              </Box>
              <Button
                onClick={createCollection}
                size={"sm"}
                variant={"solid"}
                rounded="full"
                minW={"135px"}
                display={{ base: "none", md: "flex" }}
              >
                Create {size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                NFTs
              </Button>
            </SimpleGrid>
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

export default CollectionCalculator;
