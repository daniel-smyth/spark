import { Container, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { startCreating } from "../../../lib/artengine/mainClient";

interface CreateImagesProps {
  size: number;
  layerObjects: any[];
  setImageUrls: any;
}

function CreateImages(props: CreateImagesProps) {
  /**
   * Create multiple images using Hashlips.
   */
  useEffect(() => {
    const createImages = async () => {
      const images = await startCreating(props.size, props.layerObjects);
      props.setImageUrls(images); // setState
    };
    createImages();
  }, []);

  return (
    <Stack
      minH={"50vh"}
      spacing={8}
      py={10}
      alignItems="center"
      justifyContent={"center"}
    >
      <Spinner color={"blue.500"} />
      <Stack alignItems="center">
        <Text size="lg">Creating images.</Text>
        <Text size="md">This will take a couple of seconds.</Text>
      </Stack>
    </Stack>
  );
}

export default CreateImages;
