import { Stack, Link, Heading, Button, Text, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { getLayer } from "../../../lib/hashlips/createArt";
import UploadImageFiles from "../../utils/UploadImageFiles";

function UploadLayers(props: any) {
  const [layerNames, setLayerNames] = useState<string[]>([]);
  const [layerCount, setLayerCount] = useState(8);
  const [allLayerImageSrcs, setLayerImageSrcs] = useState<any[]>([]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6}>
        {allLayerImageSrcs.length == 0 ? (
          <>
            <Text size="md" alignSelf={"center"}>
              Spark3 detects traits from your image file name. Follow our naming
              convention:
            </Text>
            <Text variant={"bold"} size="md" alignSelf={"center"}>
              "LAYERNAME_TRAITNAME.png"
            </Text>
            <Text size={"md"}>
              What are layers?{" "}
              <Link color={"blue.400"} href="/about/layers">
                Layers
              </Link>
            </Text>
            <UploadImageFiles handleUpload={uploadFiles} />
          </>
        ) : (
          <>
            <Text size="md">Pick the layer order. 1 is the background.</Text>
            {setLayerOrderComponents}
            <Button
              onClick={scrollToTop}
              size="md"
              variant="solid"
              type="submit"
            >
              Submit
            </Button>
          </>
        )}
      </Stack>
    </form>
  );
}

export default UploadLayers;
