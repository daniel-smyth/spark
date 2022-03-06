import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getLayer } from "../../../../lib/artengine/mainClient";
import FormBackground from "../../../form/FormBackground";
import FormNumberInput from "../../../form/FormNumberInput";
import UploadImageFolder from "../../../utils/UploadImageFolder";

interface UploadLayerProps {
  setState: React.Dispatch<any[]>;
}

function UploadLayersAsFolders(props: UploadLayerProps) {
  const maxLayers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [layerNames, setLayerNames] = useState<string[]>([]);
  const [layerCount, setLayerCount] = useState(1);
  const [allLayerImageSrcs, setLayerImageSrcs] = useState<any[]>([]);

  function handleNewLayer(layer: ["", string[]]) {
    console.log("Uploading new layer... ", layer);
    const newLayerName = layer[0];
    const newLayerImageSrcs = layer[1];
    layerNames.push(newLayerName);
    setLayerNames(layerNames);
    allLayerImageSrcs.push(newLayerImageSrcs);
    setLayerImageSrcs(allLayerImageSrcs);
  }

  function handleFormData(event: any) {
    event.preventDefault();
    console.log("Creating layer objects..");
    const layerObjects = [];
    for (let i = 0; i < layerCount; i++) {
      const layerData = {
        layerName: layerNames[i],
        layerImageSrcs: allLayerImageSrcs[i],
      };
      const layer = getLayer([layerData]);
      layerObjects.push(layer);
    }
    console.log("Layers created: ", layerObjects);
    props.setState(layerObjects);
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
        >
          <Stack spacing={12}>
            <Stack spacing={6}>
              <Heading size="md">Image layers details</Heading>
              <Text size="md">Upload image layers.</Text>
              <Stack spacing={6}>
                <FormNumberInput
                  label="Layer count"
                  name="layercount"
                  defaultValue={1}
                  onChange={setLayerCount}
                />
                {maxLayers.map((_l, i) => {
                  if (i < layerCount)
                    return (
                      <Stack key={i}>
                        <UploadImageFolder
                          index={i + 1}
                          addToState={handleNewLayer}
                        />
                      </Stack>
                    );
                })}
              </Stack>
            </Stack>
            <Button size="md" variant="solid" type="submit">
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </FormBackground>
  );
}

export default UploadLayersAsFolders;
