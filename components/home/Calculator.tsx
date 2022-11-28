import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
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
  useColorModeValue
} from '@chakra-ui/react';
import Spark3Black from '../Icon/spark3black';

const addCommas = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function MaxCollectionSizeCalculator() {
  const router = useRouter();
  const [size, setSize] = useState(10000);
  const [traits, setTraits] = useState(10);
  const [layers, setLayers] = useState(4);

  function incrementTraitCount(count: number) {
    setTraits(count);
    setSize(count ** layers);
  }
  function incrementLayerCount(count: number) {
    setLayers(count);
    setSize(traits ** count);
  }

  function createCollection() {
    router.push({
      pathname: '/web3/connect',
      query: { size }
    });
  }

  return (
    <Container px={12} maxW="6xl">
      <Heading fontSize={{ base: '2xl', md: '3xl' }}>How many NFTs?</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 7, md: 10 }}
        pb={{ base: 16, md: 36 }}
      >
        <Stack spacing={4}>
          <FormControl pt={6}>
            <FormLabel>
              Traits per Layer.{' '}
              <Link pt={1} color="blue.400" href="/traits">
                Traits?
              </Link>
            </FormLabel>

            <NumberInput
              value={traits}
              onChange={(e) => {
                incrementTraitCount(Number(e));
              }}
            >
              <NumberInputField bg="white" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>
              Layer count.{' '}
              <Link color="blue.400" href="/traits">
                Layers?
              </Link>
            </FormLabel>

            <NumberInput
              value={layers}
              onChange={(e) => {
                incrementLayerCount(Number(e));
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

        <Box display="flex" justifyContent="right">
          <Box
            maxW="330px"
            maxH="190px"
            w="full"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="2xl"
            rounded="xl"
            overflow="hidden"
          >
            <Stack
              color={useColorModeValue('gray.800', 'white')}
              align="center"
              p={4}
            >
              <Text variant="badge">Nft Collection size</Text>
              <Stack direction="row" align="center" justify="center">
                <Text color="black" fontSize="4xl" fontWeight={600}>
                  {size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
                <Text color="gray.500">NFTs</Text>
              </Stack>
            </Stack>

            <SimpleGrid
              w="100%"
              columns={2}
              bg={useColorModeValue('gray.50', 'gray.900')}
              px={4}
              py={2.5}
            >
              <Box display="flex">
                <Spark3Black width={60} />
              </Box>

              <Button
                onClick={() => createCollection()}
                size="sm"
                variant="solid"
                rounded="full"
                minW="135px"
                display={{ base: 'none', md: 'flex' }}
              >
                Create {addCommas(size)} NFTs
              </Button>
            </SimpleGrid>
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

export default MaxCollectionSizeCalculator;
