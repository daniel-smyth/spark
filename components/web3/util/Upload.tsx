import { Center, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

/**
 * Component to upload a folder of images using webpack. This it not a safe
 * method of uploading but is effective for testing.
 *
 * @param props index and setState()
 * @returns react component
 */
function UploadImageFiles(props: any) {
  const [imageFolderName, setImageFolderName] = useState("");
  const [uploaded, setUploaded] = useState(false);

  // Fetch images from upload and set state.
  function onUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      props.handleUpload(event.target.files);
      setUploaded(true);
    }
  }

  function getBackground() {
    if (!uploaded) return "gray.100";
    else return "gray.300";
  }

  return (
    <>
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
              isRequired
              multiple
              display={"none"}
              id={`layer-upload${props.index}`}
              type="file"
              name="myImage"
              onChange={(e) => {
                onUpload(e);
              }}
            />
          }
          {!uploaded ? (
            <Text color={"black"}>Upload artwork {props.index}</Text>
          ) : (
            <Text variant="bold" color={"black"}>
              <CheckIcon /> {imageFolderName}
            </Text>
          )}
        </Center>
      </label>
    </>
  );
}

export default UploadImageFiles;
