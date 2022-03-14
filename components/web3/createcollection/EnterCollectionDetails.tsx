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
  setSize: any;
  setName: any;
  setDescription: any;
  setNamePrefix: any;
  setMintAddress: any;
  setSaleRecipient: any;
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
    props.setSize(event.target.collectionSize.value);
    props.setName(event.target.collectionName.value);
    props.setDescription(event.target.collectionDescription.value);
    props.setNamePrefix(event.target.imageNamePrefix.value);
    props.setMintAddress(event.target.mintAddress.value);
    props.setSaleRecipient(event.target.saleRecipient.value);
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
    <FormBackground>
      <Heading fontSize={{ base: "3xl", md: "4xl" }}>
        Create NFT Collection
      </Heading>
      <form onSubmit={handleFormData}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={handleFormData}
        >
          <Stack spacing={12}>
            <Stack spacing={6}>
              <Heading size="md">Collection details</Heading>
              <Text size="md">
                Enter the metadata to be stored with your NFT collection
              </Text>
              <FormNumberInput
                label="Collection size"
                name="collectionSize"
                defaultValue={props.presetSize}
                onChange={undefined}
              />
              {getFormInput(
                "saleRecipient",
                "Address to Recieved funds of NFTs."
              )}
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
        </Box>
      </form>
    </FormBackground>
  );
}

export default SetCollectionProperties;
