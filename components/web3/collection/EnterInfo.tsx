import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import FormBackground from "../../form/FormBackground";
import FormNumberInput from "../../form/FormNumberInput";

interface SetCollectionProps {
  presetSize: number;
  setState: any;
}

function SetCollectionProperties(props: SetCollectionProps) {
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
      size: event.target.collectionSize.value,
      name: event.target.collectionName.value,
      description: event.target.collectionDescription.value,
      prefix: event.target.imageNamePrefix.value,
      mintTo: event.target.mintAddress.value,
      saleRecipient: event.target.saleRecipient.value,
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
      <Stack spacing={12}>
        <Stack spacing={6}>
          <Text size="md">
            Enter the metadata to be stored with your NFT collection
          </Text>
          <FormNumberInput
            label="Collection size"
            name="collectionSize"
            defaultValue={props.presetSize}
            onChange={undefined}
          />
          {getFormInput("saleRecipient", "Address to Recieved funds of NFTs.")}
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
              Submit
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
}

export default SetCollectionProperties;
