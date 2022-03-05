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
import { getLayer } from "../../lib/artengine/mainClient";
import FormBackground from "../form/FormBackground";
import UploadImages from "../form/UploadImageLayers";

interface UploadLayerProps {
  setState: React.Dispatch<any[]>;
}

/**
 * Creates an NFT art collection.
 *
 * @returns react component
 */
function UploadLayers(props: UploadLayerProps) {
  // Max layer count.
  const maxLayers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  // Uploaded images URLs.
  const [allLayerImageSrcs, setLayerImageSrcs] = useState<any[]>([]);
  // Layer detaisl.
  const [layerCount, setLayerCount] = useState(1);
  const [layerNames, setLayerNames] = useState<string[]>([]);
  // For submit button.
  const [isLoading, setLoading] = useState(false);

  /**
   * Fetch data from form and execute required functions to produce
   * layer objects.
   *
   * @param event user inputted art collection data
   */
  function handleFormData(event: any) {
    event.preventDefault();
    setLoading(true);

    console.log("Creating layer objects..");

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

    console.log("Layers created: ", layerObjects);
    props.setState(layerObjects);
    // console.log(completedImages);
  }

  return (
    <FormBackground>
      <Heading fontSize={{ base: "3xl", md: "4xl" }}>
        Create NFT Collection
      </Heading>

      {/* IF BLOCKCHAIN ADDRESS CAN CREATE COLLECTION  */}
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
                maxLayers={maxLayers}
                layerCount={[layerCount, setLayerCount]}
                layerNames={[layerNames, setLayerNames]}
                layerImageSrcs={[allLayerImageSrcs, setLayerImageSrcs]}
              />
            </Stack>
            {/* BUTTON */}
            <Button size="md" variant="solid" type="submit">
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </FormBackground>
  );
}

export default UploadLayers;
