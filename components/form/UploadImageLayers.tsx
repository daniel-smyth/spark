import React from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";
import FormNumberInput from "./FormNumberInput";
import UploadFolder from "../utils/UploadFolder";

interface UploadImageLayersProps {
  maxLayers: string[];
  layerCount: number | any;
  layerNames: string[] | any;
  layerImageSrcs: any[] | any;
}

export default function UploadImages(props: UploadImageLayersProps) {
  function handleNewLayer(layer: ["", string[]]) {
    console.log("Uploading new layer... ", layer);
    const newLayerName = layer[0];
    const newLayerImageSrcs = layer[1];
    props.layerNames[0].push(newLayerName);
    props.layerNames[1](props.layerNames[0]);
    props.layerImageSrcs[0].push(newLayerImageSrcs);
    props.layerImageSrcs[1](props.layerImageSrcs[0]);
  }

  return (
    <Stack spacing={6}>
      <FormNumberInput
        label="Layer count"
        name="layercount"
        defaultValue={1}
        onChange={props.layerCount[1]}
      />
      {props.maxLayers.map((_l, i) => {
        if (i < props.layerCount[0])
          return (
            <Stack key={i}>
              <UploadFolder index={i + 1} addToState={handleNewLayer} />
            </Stack>
          );
      })}
    </Stack>
  );
}
