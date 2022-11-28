/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { MdOutlineCollections } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  Stack,
  StackDivider,
  Switch,
  Text,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import {
  CONTRACT_TYPE_NAME_MAP,
  GasPrice,
  GasEstimatorMap
} from '../../constants/mappings';
import { useGas } from '../../hooks/useGas';
import useCreateCollection from '../../hooks/useCreateCollection';
import Spark3Black from '../Icon/spark3black';

interface PriceLineProps {
  title: string;
  label: string;
  children: JSX.Element | string;
}

function PriceLine({ title, label, children }: PriceLineProps) {
  return (
    <Flex justifyContent="space-between">
      <Tooltip label={label}>
        <Flex justifyContent="center" alignItems="center">
          <Text mr={1}>{title}:</Text>
          <Icon as={AiOutlineInfoCircle} boxSize={4} />
        </Flex>
      </Tooltip>
      <Text>{children}</Text>
    </Flex>
  );
}

function FeesForm() {
  // Deployment/mint costs for NFT collection
  const { deployContract, mint }: GasPrice = GasEstimatorMap['nft-collection'];

  const { collectionSize, isPaid, setIsPaid } = useCreateCollection();
  const { data } = useGas();
  const [ethOrUsd, setEthOrUsd] = useState<'eth' | 'usd'>('eth');
  const [totalFee, setTotalFee] = useState(0);
  const router = useRouter();

  // Format price in ETH to ETH/USD
  const formatPrice = useCallback(
    (price: number, format = ethOrUsd) => {
      if (format === 'eth')
        return Number(
          ethers.utils.formatUnits(
            `${((data?.gasPrice as number) || 30) * price}`,
            'gwei'
          )
        );

      return (
        Number(
          ethers.utils.formatUnits(
            `${((data?.gasPrice as number) || 30) * price}`,
            'gwei'
          )
        ) * (data?.ethPrice || 3400)
      );
    },
    [data?.ethPrice, data?.gasPrice, ethOrUsd]
  );

  // Format ETH price to USD/ETH to string with annotation
  const formatPriceToString = (price: number) => {
    if (ethOrUsd === 'eth') {
      return `~${formatPrice(price).toFixed(4)} ETH`;
    }

    return `~$${formatPrice(price).toFixed(2)}`;
  };

  // Check status of stripe payment
  useEffect(() => {
    const checkStripeStatus = () => {
      if (localStorage.getItem('status') === 'true') {
        setIsPaid(true);
        localStorage.removeItem('status');
      }
    };

    const interval = setInterval(() => checkStripeStatus(), 1000);

    if (!isPaid) {
      return () => clearInterval(interval);
    }

    return undefined;
  });

  // Check and update price of total fee
  useEffect(() => {
    const ethPrice = data && data.ethPrice > 0 ? Number(data.ethPrice) : 0;

    const newFee =
      ethPrice +
      formatPrice(deployContract, 'usd') +
      formatPrice(mint!, 'usd') * collectionSize;

    setTotalFee(Number(newFee.toFixed(2)));

    return () => {
      setTotalFee(0);
    };
  }, [collectionSize, data, deployContract, formatPrice, mint]);

  const handleClick = async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('status', 'false');
      localStorage.setItem('amount', `${99}`);
      window.open('/stripe/start', '_blank')!.focus();
    }
  };

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={3} h="8">
          <Heading size="md">Payment</Heading>
        </GridItem>

        <GridItem colStart={6} colEnd={8} h="8">
          <Spark3Black width={60} />
        </GridItem>
      </Grid>

      <Stack pt={4} spacing={6}>
        <Stack>
          <Flex mb={4}>
            <Flex justifyContent="center" alignItems="center">
              <Badge
                size="lg"
                colorScheme="green"
                borderRadius="lg"
                px={1}
                py={0.5}
                mr={3}
              >
                Ethereum
              </Badge>

              <Heading size="subtitle.sm">ETH</Heading>

              <Switch
                mx={1.5}
                onChange={() => {
                  setEthOrUsd(ethOrUsd === 'eth' ? 'usd' : 'eth');
                }}
              />
              <Heading size="subtitle.sm">USD</Heading>
            </Flex>
          </Flex>

          <Box p={4}>
            <Heading
              size="title.sm"
              mb={1}
              mr={1}
              as={Flex}
              alignItems="center"
            >
              {CONTRACT_TYPE_NAME_MAP['nft-collection']}
            </Heading>

            {deployContract && (
              <PriceLine
                title="Contract creation"
                label="The price to deploy this smart contract"
              >
                {formatPriceToString(deployContract)}
              </PriceLine>
            )}

            {mint && (
              <PriceLine title="Mint" label="The price you pay to mint one NFT">
                {formatPriceToString(mint!)}
              </PriceLine>
            )}
          </Box>

          <Text mt={4} textAlign="center">
            Estimates calculated at {data?.gasPrice} gwei and the ETH price of $
            {data?.ethPrice}.
          </Text>

          <Stack
            p={4}
            spacing={3}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Text size="sm">YOUR FEES</Text>
            <Box pb={6}>
              <Grid
                minW="100%"
                templateColumns="repeat(5, 1fr)"
                alignItems="center"
                px={3}
                p={4}
                shadow="sm"
                bg="gray.100"
                rounded="xl"
              >
                <GridItem colSpan={6}>
                  <Stack spacing={4} direction="row" align="center">
                    <Icon
                      as={MdOutlineCollections}
                      color="blue.400"
                      w={7}
                      h={7}
                    />
                    <Text fontWeight={700} size="sm">
                      NFT COLLECTION
                    </Text>
                  </Stack>
                </GridItem>
                <GridItem colStart={8} colEnd={12}>
                  <Text fontWeight={700} size="md">
                    $99.00
                  </Text>
                </GridItem>
              </Grid>
            </Box>

            <Box pr={4}>
              <Grid
                minW="100%"
                templateColumns="repeat(5, 1fr)"
                alignItems="center"
              >
                <GridItem colSpan={6}>
                  <Text size="sm">TOTAL</Text>
                </GridItem>
                <GridItem colStart={8} colEnd={12}>
                  <Text size="md">${totalFee}</Text>
                </GridItem>
              </Grid>
            </Box>
          </Stack>
        </Stack>

        <Stack>
          <Button onClick={handleClick} size="md" variant="solid">
            Proceed to payment
          </Button>
          <Link
            alignSelf="center"
            color="blue.400"
            onClick={() => router.push('/')}
          >
            Cancel
          </Link>
        </Stack>
      </Stack>
    </>
  );
}

export default FeesForm;
