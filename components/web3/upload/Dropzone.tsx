import { Center, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

function Dropzone(props: { handleUpload: (files: FileList) => void }) {
  const [uploaded, setUploaded] = useState(false);

  function onUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      props.handleUpload(event.target.files);
      setUploaded(true);
    }
  }

  return (
    <label>
      <Center
        p={2}
        cursor="pointer"
        _hover={{ bg: "gray.200" }}
        transition="background-color 0.2s ease"
        borderRadius={4}
        border="3px dashed"
        bg={!uploaded ? "gray.100" : "gray.300"}
        borderColor="gray.300"
      >
        {
          <Input
            isRequired
            multiple
            display={"none"}
            id={`layer-upload`}
            type="file"
            name="myImage"
            onChange={(e) => {
              onUpload(e);
            }}
          />
        }
        {!uploaded ? (
          <Text color={"black"}>Upload artwork</Text>
        ) : (
          <Text variant="bold" color={"black"}>
            <CheckIcon />
          </Text>
        )}
      </Center>
    </label>
  );
}

export default Dropzone;
