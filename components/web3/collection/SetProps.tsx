import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import FormNumberInput from "../../form/FormNumberInput";
import Spark3Black from "../../logo/spark3black";

interface SetCollectionProps {
  setState: any;
}

function CollectionInputForm(props: SetCollectionProps) {
  const [isLoading, setLoading] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleFormData(event: any) {
    event.preventDefault();
    setLoading(true);

    const collectionDetails = {
      name: event.target.collectionName.value,
      description: event.target.collectionDescription.value,
      prefix: event.target.imageNamePrefix.value,
      mintTo: event.target.mintAddress.value,
    };

    props.setState(collectionDetails);
  }

  function getFormInput(name: string, label: string) {
    return (
      <FormControl isRequired>
        <FormLabel>{label}</FormLabel>
        <Input name={name}></Input>
      </FormControl>
    );
  }

  return (
    <form onSubmit={handleFormData}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
        <GridItem colSpan={3} h="8">
          <Heading size="md">Enter Collection Info</Heading>
        </GridItem>
        <GridItem colStart={6} colEnd={8} h="8">
          <Spark3Black width={60} />
        </GridItem>
      </Grid>
      <Stack spacing={12}>
        <Stack spacing={6}>
          <Text size="md">
            Enter collection details. This data will be the MetaData of your
            collection.
          </Text>
          {getFormInput("mintAddress", "Address to mint NFTs to")}
          {getFormInput("collectionName", "Enter collection name")}
          {getFormInput("collectionDescription", "Enter description")}
          {getFormInput("imageNamePrefix", "Enter image name prefix")}
          {isLoading ? (
            <Button
              isLoading
              loadingText="We're on it..."
              size="md"
              variant="solid"
              type="submit"
            />
          ) : (
            <Button
              onClick={scrollToTop}
              size="md"
              variant="solid"
              type="submit"
            >
              Create Collection
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
}

export default CollectionInputForm;