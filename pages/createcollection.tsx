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
import { startCreating, getLayer } from "../lib/artengine/mainClient";
import FormBackground from "../components/form/FormBackground";
import UploadImages from "../components/form/UploadImageLayers";
import FormNumberInput from "../components/form/FormNumberInput";
import ButtonWithLoading from "../components/utils/ButtonWithLoading";

function CreateCollection() {
  const blockchainAddress = true;

  const [allLayerImageSrcs, setLayerImageSrcs] = useState<any[]>([]);
  const [layerNames, setLayerNames] = useState<string[]>([]);
  const [layerCount, setLayerCount] = useState(1);
  const [isLoading, setLoading] = useState(false);

  function handleFormData(event: any) {
    console.log("Now submitting the form with collections details..");

    event.preventDefault();
    setLoading(true);

    const collectionSize = event.target.collectionSize.value;
    const collectionName = event.target.collectionName.value;
    const collectionDescription = event.target.collectionDescription.value;
    const imageNamePrefix = event.target.imageNamePrefix.value;

    console.log("Image count: ", collectionSize);
    console.log("Layer names: ", layerNames);
    console.log("Layer image sources: ", allLayerImageSrcs);

    const layerObjects = [];
    for (let i = 0; i < layerCount; i++) {
      const layer = getLayer([
        {
          layerName: layerNames[i],
          layerImageSrcs: allLayerImageSrcs[i],
        },
      ]);
      console.log(`Adding new layer object ${i}: `, layer);
      layerObjects.push(layer);
    }

    console.log("Layers created: ", layerObjects);
    // const completedImages = startCreating(collectionSize, layerObjects);
    // console.log(completedImages);
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

export default CreateCollection;
