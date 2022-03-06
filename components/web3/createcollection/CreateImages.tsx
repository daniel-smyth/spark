import {
  Box,
  Button,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { startCreating } from "../../../lib/artengine/mainClient";
import StoreImageIpfsUrls from "./StoreImageIpfsUrls";

interface CreateImagesProps {
  name: string;
  size: number;
  layerObjects: any[];
  setImageUrls: any;
}

function CreateImages(props: CreateImagesProps) {
  const [imgSrcs, setImgSrcs] = useState<string[]>();
  const [storing, setStoring] = useState(false);

  useEffect(() => {
    const createImages = async () => {
      const images = await startCreating(props.size, props.layerObjects);
      props.setImageUrls(images); // Set parent state.
      setImgSrcs(images); // Set this this state to display.
    };
    createImages();
  }, []);

  function startStoring() {
    setStoring(true);
  }

  const imageComponents: any[] = [];
  if (imgSrcs)
    for (let i = 0; i < imgSrcs.length; i++) {
      const url = imgSrcs[i];
      imageComponents.push(<Image key={i} maxW={"70px"} src={url} />);
    }

  return (
    <>
      {!imgSrcs ? (
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
            <Text size="md">This may take a few minutes.</Text>
          </Stack>
        </Stack>
      ) : (
        <Stack maxW={"100%"} px={8} py={10} spacing={6}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Your Collection
          </Heading>
          <Text size="lg">Created {props.size} images. </Text>

          {storing ? (
            <StoreImageIpfsUrls
              size={props.size}
              name={props.name}
              allUrls={imgSrcs}
            />
          ) : (
            <Button size={"md"} variant={"solid"} onClick={startStoring}>
              Start storing as IPFS links
            </Button>
          )}
          <Box border={"8px"} p={2} borderColor="gray.200">
            <Wrap>{imageComponents}</Wrap>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default CreateImages;
