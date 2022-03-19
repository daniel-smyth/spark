import {
  Stack,
  Link,
  Heading,
  Button,
  Text,
  Select,
  Grid,
  GridItem,
  Image,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getLayer } from "../../../lib/hashlips/createArt";
import Spark3Black from "../../logo/spark3black";
import UploadImageFiles from "../../utils/UploadImageFiles";

function UploadLayers(props: any) {
  const [layerNames, setLayerNames] = useState<string[]>([]);
  const [layerCount, setLayerCount] = useState(8);
  const [allLayerImageSrcs, setLayerImageSrcs] = useState<any[]>([]);
  const [headingText, setHeadingText] = useState("Upload Images");

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    setLayerImageSrcs([]);
    setLayerImageSrcs(layers);
    setHeadingText("Set Layer Order");

    function addLayerName(name: string) {
      if (!layerNames.includes(name)) {
        layerNames.push(name);
        setLayerNames(layerNames);
      }
    }
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

  function resetLayers() {
    setLayerImageSrcs([]);
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

  const layerOrderComponent = [];
  const layerNamesString = [];
  if (allLayerImageSrcs.length != 0) {
    layerNames.sort(function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    const layerOptions = [];
    for (let i = 0; i < layerNames.length; i++) {
      layerOptions.push(
        <option key={i} value={layerNames[i]}>
          {layerNames[i]}
        </option>
      );
    }
    for (let i = 0; i < layerCount; i++) {
      layerOrderComponent.push(
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

    const string = layerNames.join(", ");
    layerNamesString.push(<Text variant="badge"> {string}</Text>);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
        <GridItem colSpan={3} h="8">
          <Heading size="md">{headingText}</Heading>
        </GridItem>
        <GridItem colStart={6} colEnd={8} h="8">
          <Spark3Black width={60} />
        </GridItem>
      </Grid>
      <Stack spacing={6}>
        {allLayerImageSrcs.length == 0 ? (
          <>
            <Text size="md">
              Spark3 will detect NFT trait types and trait names from your image
              file name. Follow our naming convention:
            </Text>
            <Text size={"md"}>
              What is a layer?{" "}
              <Link color={"blue.400"} href="/about/images">
                Layers
              </Link>
            </Text>
            <Text variant={"bold"} size="md" alignSelf={"center"}>
              "TRAITTYPE_TRAIT.png"
            </Text>
            <Box py={2}>
              <UploadImageFiles handleUpload={uploadFiles} />
            </Box>
            <Box px={4} pb={4}>
              <Text pb={2} pl={4} fontSize={"sm"}>
                <span style={{ fontStyle: "italic" }}>
                  Trait types: Background, Eyes, Fur, Mouth.
                </span>
              </Text>
              <Image shadow={"md"} src="/sampleCollection.jpg" />
            </Box>
          </>
        ) : (
          <>
            {layerNamesString}
            <Text size="md">
              Set the layer order of images. Layer 1 is the background and layer
              2 will be printed over layer 1, layer 3 over layer 2 and so on.
            </Text>
            {layerOrderComponent}
            <Button
              onClick={scrollToTop}
              size="md"
              variant="solid"
              type="submit"
            >
              Upload layers
            </Button>
            <Text px={2} pt={1} size={"md"}>
              Make a mistake?{" "}
              <Link color={"blue.400"} onClick={resetLayers}>
                Go back
              </Link>
            </Text>
          </>
        )}
      </Stack>
    </form>
  );
}

export default UploadLayers;
