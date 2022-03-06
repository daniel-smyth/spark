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
  setName: any;
  setDescription: any;
  setSize: any;
  setNamePrefix: any;
}

/**
 * Creates an NFT art collection.
 *
 * @returns react component
 */
function SetCollectionProperties(props: SetCollectionProps) {
  // For submit button
  const [isLoading, setLoading] = useState(false);

  /**
   * Set collection properties states in "/CreateCollection.tsx"
   * @param event form data
   */
  function handleFormData(event: any) {
    event.preventDefault();
    setLoading(true);

    // Fetch data from form and set hooks.
    props.setSize(event.target.collectionSize.value);
    props.setName(event.target.collectionName.value);
    props.setDescription(event.target.collectionDescription.value);
    props.setNamePrefix(event.target.imageNamePrefix.value);

    console.log(
      `Collection properties set: "${event.target.collectionSize.value}", "${event.target.collectionName.value}", "${event.target.collectionDescription.value}", "${event.target.imageNamePrefix.value}",`
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
                defaultValue={1}
                onChange={undefined}
              />
              {getFormInput("collectionName", "Enter collection name")}
              {getFormInput("collectionDescription", "Enter description")}
              {getFormInput("imageNamePrefix", "Enter image name prefix")}
              {/* BUTTON */}
              {isLoading ? (
                <Button
                  isLoading
                  loadingText="We're on it..."
                  size="md"
                  variant="solid"
                  type="submit"
                />
              ) : (
                <Button size="md" variant="solid" type="submit">
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

function getFormInput(name: string, label: string) {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input name={name}></Input>
    </FormControl>
  );
}

export default SetCollectionProperties;
