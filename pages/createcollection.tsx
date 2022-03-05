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
import { ConnectWallet } from "@3rdweb/react";
import { getLayer } from "../lib/artengine/mainClient";
import FormBackground from "../components/form/FormBackground";
import UploadImages from "../components/form/UploadImageLayers";
import FormNumberInput from "../components/form/FormNumberInput";
import ButtonWithLoading from "../components/utils/ButtonWithLoading";

/**
 * Creates an NFT art collection.
 *
 * @returns react component
 */
function CreateCollection() {
  // TODO Remove when completed test.
  const blockchainAddress = true;
  // Uploaded images by user. Layers consisting of image sources.
  const [layerCount, setLayerCount] = useState(1);
  const [layerNames, setLayerNames] = useState<string[]>([]);
  const [allLayerImageSrcs, setLayerImageSrcs] = useState<any[]>([]);
  // For submit button
  const [isLoading, setLoading] = useState(false);

  /**
   * Fetch data from form and execute required functions to produce
   * the art colleciton. This function simply calls top level functions.
   *
   * @param event user inputted art collection data
   */
  function handleFormData(event: any) {
    event.preventDefault();
    setLoading(true);

    // Fetch data from form.
    const collectionSize = event.target.collectionSize.value;
    const collectionName = event.target.collectionName.value;
    const collectionDescription = event.target.collectionDescription.value;
    const imageNamePrefix = event.target.imageNamePrefix.value;

    console.log("Create layer objects..");
    console.log("Layer names: ", layerNames);
    console.log("Layer image sources: ", allLayerImageSrcs);

    // Create image layer data.
    const layerObjects = [];
    for (let i = 0; i < layerCount; i++) {
      const layerData = {
        layerName: layerNames[i],
        layerImageSrcs: allLayerImageSrcs[i],
      };
      const layer = getLayer([layerData]);
      console.log(`Adding new layer object ${i}: `, layer);
      layerObjects.push(layer);
    }

    // !
    console.log("Layers created: ", layerObjects);
    // const completedImages = startCreating(collectionSize, layerObjects);
    // console.log(completedImages);
  }

  return (
    <FormBackground>
      <Heading fontSize={{ base: "3xl", md: "4xl" }}>
        Create NFT Collection
      </Heading>

      {/* IF BLOCKCHAIN ADDRESS CAN CREATE COLLECTION  */}
      {blockchainAddress ? (
        <form onSubmit={handleFormData}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            onSubmit={handleFormData}
          >
            <Stack spacing={12}>
              {/* LAYER(S) DETAILS */}
              <Stack spacing={6}>
                <Heading size="md">Image layers details</Heading>
                <Text size="md">Upload image layers.</Text>
                <UploadImages
                  layerCount={[layerCount, setLayerCount]}
                  layerNames={[layerNames, setLayerNames]}
                  layerImageSrcs={[allLayerImageSrcs, setLayerImageSrcs]}
                />
              </Stack>
              {/* COLLLECTION DETAILS */}
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
                {getFormInput(
                  "collectionDescription",
                  "Enter collection description"
                )}
                {getFormInput("imageNamePrefix", "Enter image name prefix")}
                {/* BUTTON */}
                <ButtonWithLoading />
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
      ) : (
        <>
          <Text size="md">
            Please connect your wallet to mint your collection
          </Text>
          <ConnectWallet variant={"solid"} />
        </>
      )}
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

export default CreateCollection;
