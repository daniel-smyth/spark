import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getLayer } from "../../../../lib/artengine/mainClient";
import FormBackground from "../../../form/FormBackground";
import FormNumberInput from "../../../form/FormNumberInput";
import UploadImageFiles from "../../../utils/UploadImageFiles";

interface UploadLayerProps {
  setState: React.Dispatch<any[]>;
}

function UploadLayersAsFiles(props: UploadLayerProps) {
  const [layerNames, setLayerNames] = useState<string[]>([]);
  const [layerCount, setLayerCount] = useState(8);
  const [allLayerImageSrcs, setLayerImageSrcs] = useState<any[]>([]);

  function addLayerName(name: string) {
    if (!layerNames.includes(name)) {
      layerNames.push(name);
      setLayerNames(layerNames);
    }
  }

  function uploadFiles(files: FileList) {
    console.log("Uploading layers... ");
    // Get layer names.
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      const layerName = image.name.substring(0, image.name.indexOf("_"));
      addLayerName(layerName);
    }

    // Create layers object.
    const layers = layerNames.map((layerName) => [layerName, []]);
    // Set layer image urls.
    for (let i = 0; i < files.length; i++) {
      const image = files[i] as File;
      const layerName = image.name.substring(0, image.name.indexOf("_"));
      const imageName = image.name.substring(image.name.indexOf("_") + 1);
      const imageUrl = URL.createObjectURL(image);
      layers.forEach((layer) => {
        if (layer[0] == layerName) {
          const urlArray = layer[1] as Array<any[]>;
          urlArray.push([imageName, imageUrl]);
        }
      });
    }
    console.log("Layers uploaded: ", layers);
    setLayerImageSrcs(layers);
  }

  const setLayerOrderComponents = [];
  if (allLayerImageSrcs.length != 0) {
    const layerOptions = [];
    for (let i = 0; i < layerNames.length; i++) {
      layerOptions.push(
        <option key={i} value={layerNames[i]}>
          {layerNames[i]}
        </option>
      );
    }
    for (let i = 0; i < layerCount; i++) {
      setLayerOrderComponents.push(
        <>
          <Select placeholder={"Layer " + (i + 1)} size="md">
            {layerOptions}
          </Select>
        </>
      );
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("Creating layer objects..");
    const layerObjects = [];
    for (let i = 0; i < layerCount; i++) {
      const layerData = {
        layerName: allLayerImageSrcs[i][0],
        layerImageSrcs: allLayerImageSrcs[i][1],
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
      <form onSubmit={handleSubmit}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={6}>
            <Heading size="md">Upload Layers</Heading>
            <Text size="md">
              Spark will detect layer names from the image name. Just follow
              this naming convention for images:
            </Text>
            <Text variant={"bold"} size="md">
              "LAYERNAME_myImageName.png"
            </Text>
            <Text size="md">
              Sparks art engine will pick up the layername before the first
              underscore.
            </Text>
            <Stack spacing={6}>
              <UploadImageFiles handleUpload={uploadFiles} />
            </Stack>
            {allLayerImageSrcs.length != 0 ? (
              <>
                <br />
                <Heading size="md">Layer Order</Heading>
                <Text size="md">
                  Now it's time to pick the layer order so our images look
                  right:
                </Text>
              </>
            ) : null}
            {setLayerOrderComponents}
            <Button size="md" variant="solid" type="submit">
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </FormBackground>
  );
}

export default UploadLayersAsFiles;
