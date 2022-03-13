import {
  Box,
  Container,
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
import React, { useState } from "react";
import Spark3Black from "../logo/spark3black";

function CollectionCalculator() {
  const [size, setSize] = useState(10000);
  const [traits, setTraits] = useState(10);
  const [layers, setLayers] = useState(4);

  function calculate(e: number, type: string) {
    let newSize = 0;
    if (type == "trait") newSize = Math.pow(e, layers);
    if (type == "layer") newSize = Math.pow(traits, e);
    setSize(newSize);
    console.log("Set size as:", size);
  }

  function handleNewTrait(e: number) {
    setTraits(e);
    calculate(e, "trait");
  }
  function handleNewLayer(e: number) {
    setLayers(e);
    calculate(e, "layer");
  }

  return (
    <Container px={{ base: 5 }} maxW="6xl" spacing={{ base: 8, md: 8 }}>
      <Heading
        display={{ base: "none", md: "inline" }}
        fontSize={{ base: "2xl", md: "3xl" }}
      >
        How many NFTs do you want?
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 7, md: 10 }}
        px={{ base: 5 }}
        pb={{ base: 16, md: 36 }}
      >
        <Heading
          display={{ base: "inline", md: "none" }}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          How many NFTs do you want?
        </Heading>
        <Stack spacing={7} pt={5}>
          <FormControl isRequired>
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
              What's a trait? <Link color={"blue.400"}>Traits</Link>
            </Text>
          </FormControl>
          <FormControl isRequired>
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
              What's a layer? <Link color={"blue.400"}>Layers</Link>
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
              <Text variant="badge">Collection size</Text>
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <Text color="black" fontSize={"4xl"} fontWeight={600}>
                  {size}
                </Text>
                <Text color={"gray.500"}>NFTs</Text>
              </Stack>
              <Stack
                direction={"row"}
                align={"center"}
                justify={"center"}
              ></Stack>
            </Stack>
            <Box
              bg={useColorModeValue("gray.50", "gray.900")}
              px={6}
              py={4}
              justifyContent={"right"}
              display="flex"
            >
              <Spark3Black width={60} />
            </Box>
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

export default CollectionCalculator;
