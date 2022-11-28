import React from 'react';
import { AiTwotoneShop } from 'react-icons/ai';
import { BsCoin } from 'react-icons/bs';
import { VscOrganization } from 'react-icons/vsc';
import {
  Stack,
  Box,
  Heading,
  Button,
  SimpleGrid,
  Text,
  Icon,
  Container
} from '@chakra-ui/react';
import ProductPrice from './Price';

function ComingSoonMobile() {
  return (
    <Stack spacing={6} display={{ md: 'none' }}>
      <Box
        textTransform="uppercase"
        color="blue.400"
        fontSize="sm"
        bg="blue.50"
        p="2"
        px="3"
        rounded="md"
        display="flex"
      >
        <Icon as={AiTwotoneShop} color="#1B486D" w={5} h={5} />
        <Text fontWeight={600} pl={2}>
          NFT Marketplace
        </Text>
      </Box>
      <Box
        textTransform="uppercase"
        color="blue.400"
        fontSize="sm"
        bg="blue.50"
        p="2"
        px="3"
        rounded="md"
        display="flex"
      >
        <Icon as={BsCoin} color="#1B486D" w={5} h={5} />

        <Text fontWeight={600} pl={2}>
          ERC20 Token
        </Text>
      </Box>

      <Box
        textTransform="uppercase"
        color="blue.400"
        fontSize="sm"
        bg="blue.50"
        p="2"
        px="3"
        rounded="md"
        display="flex"
      >
        <Icon as={VscOrganization} color="#1B486D" w={5} h={5} />

        <Text fontWeight={600} pl={2}>
          DAo
        </Text>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button size="md" variant="solid" width="100%">
          Learn more
        </Button>
      </Box>
    </Stack>
  );
}

function ComingSoonDesktop() {
  return (
    <SimpleGrid
      display={{ base: 'none', md: 'flex' }}
      columns={{ base: 1, md: 3 }}
      spacing={{ base: 12, md: 10 }}
    >
      <ProductPrice
        title="NFT Marketplace"
        price="0"
        feature1="NFT marketplace on your website"
        feature2="Cut out exchange fees"
        feature3="Manage drops and create collections"
        feature4="Website installation in a few days"
        buttonText="soon"
        link=""
        color="grey"
        isDisabled
      />

      <ProductPrice
        title="ERC20 Token"
        price="0"
        feature1="Create your own coin to buy and sell"
        feature2="A coin to go with your marketplace"
        feature3="Sell on all major exchanges"
        feature4="Setup in 5 minutes"
        buttonText="soon"
        link=""
        color="grey"
        isDisabled
      />

      <ProductPrice
        title="DAO"
        price="0"
        feature1="Build a DAO treasury"
        feature2="Use DAO governance"
        feature3="Support DAO voting systems"
        feature4="Fast and cheap"
        buttonText="Soon"
        link=""
        color="grey"
        isDisabled
      />
    </SimpleGrid>
  );
}

function ComingSoon() {
  return (
    <Container maxW="6xl" px={12}>
      <Stack spacing={5} pb={{ base: 16, md: 36 }}>
        <Heading fontSize={{ base: '2xl', md: '3xl' }}>Coming soon</Heading>

        <ComingSoonMobile />

        <ComingSoonDesktop />
      </Stack>
    </Container>
  );
}

export default ComingSoon;
