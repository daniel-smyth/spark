/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import Spark3Black from '../Icon/spark3black';
import { CollectionProperties } from '../../types/CreateCollection';
import useCreateCollection from '../../hooks/useCreateCollection';
import FormNumberInput from './FormNumberInput';

function CollectionPropertiesForm() {
  const { collectionSize, setCollectionSize, setCollectionProperties } =
    useCreateCollection();
  const router = useRouter();

  function submit(event: any) {
    event.preventDefault();

    const collectionProps: CollectionProperties = {
      name: event.target.name.value,
      prefix: event.target.prefix.value,
      description: event.target.description.value,
      symbol: event.target.symbol.value,
      size: collectionSize,
      platform_fee_basis_points: 20,
      primary_sale_recipient: process.env.SPARK3_ADDRESS!,
      // primary_sale_recipient: event.target.primary_sale_recipient.value,
      seller_fee_basis_points: Number(
        event.target.seller_fee_basis_points.value
      ),
      fee_recipient: process.env.SPARK3_ADDRESS,
      // fee_recipient: event.target.primary_sale_recipient.value,
      external_link: event.target.external_link.value
    };

    setCollectionProperties(collectionProps);
  }

  function goBack() {
    router.push('/create-collection');
  }

  return (
    <form onSubmit={submit}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
        <GridItem colSpan={3} h="8">
          <Heading size="md">Collection Properties</Heading>
        </GridItem>
        <GridItem colStart={6} colEnd={8} h="8">
          <Spark3Black width={60} />
        </GridItem>
      </Grid>

      <Stack pb={{ base: 4, md: 6 }} spacing={12}>
        <Stack spacing={6}>
          <Text size="md">
            Initial value is the max size you can make your collection with
            uploaded artwork.
          </Text>
          <FormNumberInput
            maxSize={collectionSize}
            label="Collection size"
            name="collectionSize"
            defaultValue={collectionSize}
            onChange={setCollectionSize}
          />
        </Stack>
      </Stack>

      <Stack pt={{ base: 4, md: 0 }} spacing={12}>
        <Stack spacing={6}>
          <Text size="md">This data cannot be changed</Text>

          <FormControl isRequired>
            <FormLabel>Collection name</FormLabel>
            <Input name="name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Collection description</FormLabel>
            <Input name="description" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Image name prefix (prefix.png)</FormLabel>
            <Input name="prefix" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Address to mint NFTs to</FormLabel>
            <Input name="primary_sale_recipient" />
          </FormControl>

          <Text size="md">Optional data</Text>

          <FormControl>
            <FormLabel>Your collection&apos;s external link</FormLabel>
            <Input name="external_link" />
          </FormControl>
          <FormControl>
            <FormLabel>Your collection symbol</FormLabel>
            <Input name="symbol" />
          </FormControl>
          <FormControl>
            <FormLabel>Your royalty on secondary sales</FormLabel>
            <Input name="seller_fee_basis_points" />
          </FormControl>

          <Button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }
            size="md"
            variant="solid"
            type="submit"
          >
            Create Collection
          </Button>
          <Text px={2} size="md">
            Make a mistake?{' '}
            <Link color="blue.400" onClick={() => goBack()}>
              Go back
            </Link>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
}

export default CollectionPropertiesForm;
