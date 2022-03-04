import { Center, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";

function UploadFolder(props: any) {
  return (
    <>
      <label htmlFor={`layer-upload${props.index}`}>
        <Center
          p={6}
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
                props.layerState(e.target.files);
              }}
            />
          }
          <Text color={"black"}>Click to upload layer</Text>
        </Center>
      </label>
    </>
  );
}

export default UploadFolder;
