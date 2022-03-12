import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getLayer } from "../../../lib/hashlips/createArt";
import FormBackground from "../../form/FormBackground";
import UploadImageFiles from "../../utils/UploadImageFiles";
import { useRouter } from "next/router";

interface UploadLayerProps {
  setState: React.Dispatch<any[]>;
}

function UploadLayersAsFiles(props: UploadLayerProps) {
  const router = useRouter();
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

    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      const layerName = image.name.substring(0, image.name.indexOf("_"));
      addLayerName(layerName);
    }

    setLayerCount(layerNames.length);

    const layers = layerNames.map((layerName) => [layerName, []]);
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

  function changeLayerOrder(e: any, i: number) {
    const layerName = e.target.value;
    const layerPosition = i;
    const index = allLayerImageSrcs.indexOf(
      allLayerImageSrcs.find((layer) => (layer[0] == layerName ? layer : null))
    );
    const splicedLayer = allLayerImageSrcs.splice(index, 1);
    allLayerImageSrcs.splice(layerPosition, 0, splicedLayer[0]);
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
        <Select
          onChange={(e) => changeLayerOrder(e, i)}
          key={i}
          placeholder={"Layer " + (i + 1)}
          size="md"
        >
          {layerOptions}
        </Select>
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

  function startOver() {
    router.push("/createcollection/create");
  }

  return (
    <FormBackground>
      <form onSubmit={handleSubmit}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={6}>
            {allLayerImageSrcs.length == 0 ? (
              <>
                <Heading size="md" alignSelf={"center"}>
                  Upload Layers
                </Heading>
                <Text size="md" alignSelf={"center"}>
                  Spark detects layer names from your image file name. These
                  layer names will be included in your NFT data. Follow our
                  naming convention:
                </Text>
                <Text variant={"bold"} size="md">
                  "LAYERNAME_IMAGENAME.png"
                </Text>
                <Text size="md">
                  "Background_blue.png"{<br />}"hat_redFedora.png"
                </Text>
                <Text size="md"></Text>
                <Stack spacing={6}>
                  <UploadImageFiles handleUpload={uploadFiles} />
                </Stack>
              </>
            ) : (
              <>
                <Heading size="md">Layer Order</Heading>
                <Text size="md">
                  Now it's time to pick the layer order so our images look
                  right:
                </Text>
              </>
            )}
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
