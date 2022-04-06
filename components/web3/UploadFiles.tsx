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
import { getLayer } from "../../lib/hashlips/main";
import Spark3Black from "../icon/spark3black";
import UploadImageFiles from "../util/Upload";

interface Props {
  layerState: any;
  sizeState: any;
}

function UploadFiles(props: Props) {
  const [count, setCount] = useState(0);
  const [layers, setLayers] = useState<any[]>([]);
  const [traits, setTraits] = useState<string[]>([]);
  const [heading, setHeading] = useState("Upload Images");

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function uploadLayers(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const name = files[i].name.substring(0, files[i].name.indexOf("_"));
      if (!traits.includes(name)) {
        traits.push(name);
        setTraits(traits);
      }
    }

    const layers = traits.map((layerName) => [layerName, []]);
    for (let i = 0; i < files.length; i++) {
      const trait = files[i].name.substring(0, files[i].name.indexOf("_"));
      const type = files[i].name.substring(files[i].name.indexOf("_") + 1);
      const url = URL.createObjectURL(files[i]);
      layers.forEach((layer) => {
        if (layer[0] == trait) {
          const urlArray = layer[1] as Array<any[]>;
          urlArray.push([type, url]);
        }
      });
    }

    let maxSize = 0;
    layers.forEach((layer, i) => {
      if (i == 0) maxSize = layer[1].length;
      else maxSize = maxSize * layer[1].length;
    });

    props.sizeState(maxSize);
    setCount(traits.length);
    setLayers(layers);
    setHeading("Set Layer Order");
  }

  function resetLayers() {
    setLayers([]);
  }

  function changeLayersOrder(e: any, i: number) {
    const index = layers.indexOf(
      layers.find((layer) => (layer[0] == e.target.value ? layer : null))
    );
    layers.splice(i, 0, layers.splice(index, 1)[0]);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const cleanedLayers = layers.map((layerImg) => {
      const layerData = {
        layerName: layerImg[0],
        layerImageSrcs: layerImg[1],
      };
      const layer = getLayer([layerData]);
      return layer;
    });
    props.layerState(cleanedLayers);
  }

  const layerOrderComponent = [];
  const layerNamesString = [];
  if (layers.length != 0) {
    traits.sort(function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    const layerOptions = [];
    for (let i = 0; i < traits.length; i++) {
      layerOptions.push(
        <option key={i} value={traits[i]}>
          {traits[i]}
        </option>
      );
    }
    for (let i = 0; i < count; i++) {
      layerOrderComponent.push(
        <Select
          onChange={(e) => changeLayersOrder(e, i)}
          key={i}
          placeholder={"Layer " + (i + 1)}
          size="md"
        >
          {layerOptions}
        </Select>
      );
    }
    const string = traits.join(", ");

    layerNamesString.push(
      <Text key={0} variant="badge">
        {" "}
        {string}
      </Text>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
        <GridItem colSpan={3} h="8">
          <Heading size="md">{heading}</Heading>
        </GridItem>
        <GridItem colStart={6} colEnd={8} h="8">
          <Spark3Black width={60} />
        </GridItem>
      </Grid>
      <Stack spacing={6}>
        {layers.length == 0 ? (
          <>
            <Box py={2}>
              <UploadImageFiles handleUpload={uploadLayers} />
            </Box>
            <Text size="md">
              Spark3 detects NFT
              <Link color={"blue.400"} href="/about/images">
                {" "}
                trait types and trait names{" "}
              </Link>
              from your image file name. Follow our naming convention:
            </Text>
            <Text variant={"bold"} size="md" alignSelf={"center"}>
              "TRAITTYPE_TRAIT.png"
            </Text>

            <Box px={4} pb={4}>
              <Text pb={2} pl={4} fontSize={"sm"}>
                <span style={{ fontStyle: "italic" }}>
                  Trait examples: Background, Eyes, Fur, Mouth.
                </span>
              </Text>
              <Image shadow={"md"} src="/sampleCollection.jpg" />
            </Box>
          </>
        ) : (
          <>
            <Box pt={{ base: 2, md: 0 }}>{layerNamesString}</Box>
            <Text size="md" display={{ base: "none", md: "inline" }} px={2}>
              Layer 1 is background and layer 2 will be printed over layer 1.
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
            <Text px={2} size={"md"}>
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

export default UploadFiles;
