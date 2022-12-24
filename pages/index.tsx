import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AiTwotoneShop } from 'react-icons/ai';
import { BsCoin } from 'react-icons/bs';
import { FiImage, FiDatabase, FiRepeat } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { VscOrganization } from 'react-icons/vsc';
import {
  Box,
  Button,
  Container,
  createIcon,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Link,
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
  StackDivider,
  Text
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import Spark3Black from '../components/Icon/spark3black';

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  )
});

function Hero() {
  const router = useRouter();

  return (
    <Stack
      spacing={5}
      height="100vh"
      justifyContent="center"
      textAlign="center"
    >
      <Heading fontSize="3xl">
        <Text color="black">Web3 is here.</Text>
        <Text color="blue.500">Upload. Create. Sell.</Text>
      </Heading>
      <Text size="xl">Create up to 10,000 NFTs in minutes.</Text>
      <Stack alignSelf="center" position="relative">
        <Button
          variant="solid"
          onClick={() => router.push('/web3/create-collection')}
        >
          Create 10,000 NFTs
        </Button>
        <Text size="sm">mobile - desktop</Text>
        <Box>
          <Icon
            as={Arrow}
            color="gray.800"
            position="absolute"
            right="-65px"
            top="32px"
            w={71}
          />
          <Text
            color="black"
            fontSize="lg"
            fontFamily="Caveat"
            position="absolute"
            transform="rotate(10deg)"
            right={{ base: '-70px', md: '-95px' }}
            top="3px"
          >
            5 minutes
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
}

function Calculator() {
  const [maxSize, setMaxSize] = useState(10000);
  const [traitCount, setTraitCount] = useState(10);
  const [layerCount, setLayerCount] = useState(4);
  const router = useRouter();

  return (
    <Box>
      <Heading fontSize="3xl">How many NFTs?</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack>
          <FormControl pt={6}>
            <FormLabel>
              Traits per Layer.{' '}
              <Link color="blue.400" href="/web3/traits">
                Traits?
              </Link>
            </FormLabel>
            <NumberInput
              value={traitCount}
              onChange={(e) => {
                setTraitCount(Number(e));
                setMaxSize(Number(e) ** layerCount);
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
              <Link color="blue.400" href="/web3/traits">
                Layers?
              </Link>
            </FormLabel>
            <NumberInput
              value={layerCount}
              onChange={(e) => {
                setLayerCount(Number(e));
                setMaxSize(traitCount ** Number(e));
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
            bg="white"
            rounded="xl"
            boxShadow="2xl"
            w="full"
            maxW="330px"
            maxH="190px"
          >
            <Stack color="gray.800" align="center" p={4}>
              <Text variant="badge">Nft Collection size</Text>
              <Stack direction="row" justify="center">
                <Text color="black" fontSize="4xl" fontWeight={600}>
                  {maxSize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
                <Text color="gray.500">NFTs</Text>
              </Stack>
            </Stack>
            <SimpleGrid columns={2} bg="gray.50" w="100%" p={4}>
              <Box display="flex">
                <Spark3Black width={60} />
              </Box>
              <Button
                size="sm"
                variant="solid"
                rounded="full"
                minW="135px"
                display={{ base: 'none', md: 'flex' }}
                onClick={() =>
                  router.push({
                    pathname: '/web3/connect',
                    query: { size: maxSize }
                  })
                }
              >
                Create{' '}
                {maxSize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} NFTs
              </Button>
            </SimpleGrid>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

interface FeatureProps {
  text: string;
  icon: IconType;
  iconBg: string;
}

function Feature({ text, icon, iconBg }: FeatureProps) {
  return (
    <Stack direction="row" align="center">
      <Flex
        bg={iconBg}
        align="center"
        justify="center"
        rounded="full"
        w={8}
        h={8}
      >
        <Icon as={icon} color="white" w={5} h={5} />
      </Flex>
      <Text color="black" variant="bold">
        {text}
      </Text>
    </Stack>
  );
}

interface ProductPriceProps {
  title: string;
  price: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  buttonText: string;
  link: string;
  color: string;
  isDisabled: boolean;
}

function ProductPrice({
  title,
  price,
  feature1,
  feature2,
  feature3,
  feature4,
  buttonText,
  link,
  color,
  isDisabled
}: ProductPriceProps) {
  const router = useRouter();

  return (
    <Box
      w="full"
      maxW="330px"
      maxH="465px"
      rounded="xl"
      overflow="hidden"
      bg="white"
      boxShadow="2xl"
    >
      <Stack p={6} align="center" color="gray.800">
        <Text variant="badge">{title}</Text>

        {Number(price) > 0 ? (
          <Stack direction="row" align="center" justify="center">
            <Text fontSize="2xl">$</Text>
            <Text color="black" fontSize="5xl" fontWeight={600}>
              {price || null}
            </Text>
            <Text color="gray.500">USD</Text>
          </Stack>
        ) : null}
      </Stack>
      <Box px={6} py={10} bg="gray.50">
        <List spacing={3}>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${color}.500`} />
              {feature1}
            </Text>
          </ListItem>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${color}.500`} />
              {feature2}
            </Text>
          </ListItem>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${color}.500`} />
              {feature3}
            </Text>
          </ListItem>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${color}.500`} />
              {feature4}
            </Text>
          </ListItem>
        </List>
        <Button
          onClick={() =>
            router.push({
              pathname: link
            })
          }
          size="md"
          w="full"
          mt={10}
          variant="solid"
          bg={color === 'grey' ? color : 'blue.500'}
          isDisabled={!!isDisabled}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

function HowItWorks() {
  const router = useRouter();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }}>
      <Box display={{ base: 'none', md: 'flex' }}>
        <ProductPrice
          title="NFT Collection"
          price="99"
          feature1="Multiply and sell artwork on exchanges"
          feature2="Unlimited artwork collection size"
          feature3="Setup completed in 5 minutes"
          feature4="No downloads."
          buttonText="Create Collection"
          link="/web3/connect"
          color="blue"
          isDisabled={false}
        />
      </Box>
      <Stack spacing={8} justifyContent="center">
        <Heading fontSize="3xl">How does it work?</Heading>
        <Stack spacing={3} divider={<StackDivider borderColor="gray.100" />}>
          <Feature
            text="1. Mutliply Artwork"
            icon={FiImage}
            iconBg="blue.500"
          />
          <Text size="sm">Multiply your images with the Spark3 art engine</Text>
          <Feature text="2. Mint Artwork" icon={FiDatabase} iconBg="blue.500" />
          <Text size="sm">
            Mint your new images directly to an address of your choice
          </Text>
          <Feature text="3. Sell Artwork" icon={FiRepeat} iconBg="blue.500" />
          <Text size="sm">
            Sell your newly created NFT Artwork on any major exchange
          </Text>
          <Box>
            <Button
              minW="100%"
              onClick={() => router.push('/web3/connect')}
              size="md"
              variant="solid"
              display={{ base: 'flex', md: 'none' }}
            >
              Create Collection
            </Button>
          </Box>
        </Stack>
      </Stack>
    </SimpleGrid>
  );
}

interface MobileBadgeProps {
  text: string;
  icon: IconType;
}

function MobileBadge({ text, icon }: MobileBadgeProps) {
  return (
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
      <Icon as={icon} color="#1B486D" w={5} h={5} />
      <Text fontWeight={600} pl={2}>
        {text}
      </Text>
    </Box>
  );
}

function ComingSoon() {
  return (
    <Stack spacing={6}>
      <Heading fontSize="3xl">Coming soon</Heading>
      <Stack spacing={6} display={{ md: 'none' }}>
        <MobileBadge text="NFT Marketplace" icon={AiTwotoneShop} />
        <MobileBadge text="ERC20 Token" icon={BsCoin} />
        <MobileBadge text="DAO" icon={VscOrganization} />
        <Box display="flex" justifyContent="center">
          <Button size="md" variant="solid" width="100%">
            Learn more
          </Button>
        </Box>
      </Stack>
      <SimpleGrid
        display={{ base: 'none', md: 'flex' }}
        columns={3}
        spacing={10}
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
    </Stack>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Container maxW="6xl" px={10}>
        <Stack spacing={20}>
          <Calculator />
          <HowItWorks />
          <ComingSoon />
        </Stack>
      </Container>
    </>
  );
}

export default HomePage;
