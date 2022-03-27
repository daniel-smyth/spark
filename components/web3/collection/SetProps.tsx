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
import Spark3Black from "../../logo/spark3black";
import { useAtom } from "jotai";

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
    const info = {
      name: event.target.name.value,
      description: event.target.description.value,
      prefix: event.target.prefix.value,
      mintTo: event.target.mintTo.value,
    };
    props.setState(info);
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
          {getFormInput("mintTo", "Address to mint NFTs to")}
          {getFormInput("name", "Enter collection name")}
          {getFormInput("description", "Enter description")}
          {getFormInput("prefix", "Enter image name prefix")}
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
