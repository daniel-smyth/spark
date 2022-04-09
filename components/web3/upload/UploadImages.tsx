import { Box, Image, Text, Link } from "@chakra-ui/react";
import React from "react";
import FormHeader from "../../form/FormHeader";
import Dropzone from "./Dropzone";

function UploadImages(props: { handleUpload: (files: FileList) => void }) {
  return (
    <>
      <FormHeader heading={"Upload images"} />
      <Box py={2}>
        <Dropzone handleUpload={props.handleUpload} />
      </Box>
      <Text size="md">
        Spark3 detects NFT
        <Link color={"blue.400"} href="/traits">
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
  );
}

export default UploadImages;
