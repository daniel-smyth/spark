import { Center, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

function UploadFolder(props: any) {
  const [layerName, setLayerName] = useState("");

  function onImageChange(event: any) {
    const layerImageSrcs: any[] = [];
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        const imageFile = event.target.files[i] as File;
        const imageName = imageFile.name;
        const imageUrl = URL.createObjectURL(imageFile);
        layerImageSrcs.push([imageName, imageUrl]);
      }
    }
    props.addToState([layerName, layerImageSrcs]);
  }

  return (
    <>
      <FormControl isRequired>
        <FormLabel>Enter layer name {props.index}</FormLabel>
        <Input onChange={(e) => setLayerName(e.target.value)}></Input>
      </FormControl>
      {layerName != "" ? (
        <label htmlFor={`layer-upload${props.index}`}>
          <Center
            p={2}
            cursor="pointer"
            bg="gray.100"
            _hover={{ bg: "gray.200" }}
            transition="background-color 0.2s ease"
            borderRadius={4}
            border="3px dashed"
            borderColor="gray.300"
          >
            {
              <Input
                display={"none"}
                id={`layer-upload${props.index}`}
                type="file"
                name="myImage"
                directory=""
                webkitdirectory=""
                onChange={(e) => {
                  onImageChange(e);
                }}
              />
            }
            <Text color={"black"}>Click to upload layer {props.index}</Text>
          </Center>
        </label>
      ) : null}
    </>
  );
}

export default UploadFolder;
