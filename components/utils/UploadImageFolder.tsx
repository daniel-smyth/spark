import { Center, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

/**
 * Component to upload a folder of images using webpack. This it not a safe
 * method of uploading but is effective for testing.
 *
 * @param props index and setState()
 * @returns react component
 */
function UploadImageFolder(props: any) {
  const [imageFolderName, setImageFolderName] = useState("");
  const [uploaded, setUploaded] = useState(false);

  // Fetch images from upload and set state.
  function onUpload(event: any) {
    const layerImageSrcs: any[] = [];
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        const imageFile = event.target.files[i] as File;
        const imageName = imageFile.name;
        const imageUrl = URL.createObjectURL(imageFile);
        layerImageSrcs.push([imageName, imageUrl]);
      }
    }
    if (layerImageSrcs.length != 0) {
      props.addToState([imageFolderName, layerImageSrcs]);
      setUploaded(true);
    }
  }

  function getBackground() {
    if (!uploaded) {
      return "gray.100";
    } else {
      return "gray.300";
    }
  }

  return (
    <>
      <FormControl isRequired>
        <FormLabel>Enter layer name {props.index}</FormLabel>
        <Input onChange={(e) => setImageFolderName(e.target.value)}></Input>
      </FormControl>
      {imageFolderName != "" ? (
        <label htmlFor={`layer-upload${props.index}`}>
          <Center
            p={2}
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
            transition="background-color 0.2s ease"
            borderRadius={4}
            border="3px dashed"
            bg={getBackground()}
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
                  onUpload(e);
                }}
              />
            }
            {!uploaded ? (
              <Text color={"black"}>Click to upload layer {props.index}</Text>
            ) : (
              <Text variant="bold" color={"black"}>
                <CheckIcon /> {imageFolderName}
              </Text>
            )}
          </Center>
        </label>
      ) : null}
    </>
  );
}

export default UploadImageFolder;
