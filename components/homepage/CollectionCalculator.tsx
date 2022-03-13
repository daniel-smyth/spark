import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  List,
  ListIcon,
  ListItem,
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
import { CheckIcon } from "@chakra-ui/icons";
import Spark3Black from "../logo/spark3black";

function CollectionCalculator() {
  const [size, setSize] = useState(10000);
  const [traits, setTraits] = useState(10);
  const [layers, setLayers] = useState(4);

  function calculate() {
    let size = Math.pow(traits, layers);
    setSize(size);
  }

  function handleNewTrait(e: number) {
    setTraits(e);
    calculate();
  }
  function handleNewLayer(e: number) {
    setLayers(e);
    calculate();
  }

  return (
    <Container maxW="6xl" spacing={{ base: 8, md: 8 }}>
      <Heading fontSize={{ base: "2xl", md: "3xl" }}>
        How many NFTs do you want?
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        px={{ base: 5 }}
        pb={{ base: 16, md: 36 }}
      >
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
          </FormControl>
        </Stack>

        <Box display={"flex"} justifyContent={"right"}>
          <Box
            maxW={"330px"}
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
              <Text color="black" fontSize={"4xl"} fontWeight={600}>
                {size}
              </Text>
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
