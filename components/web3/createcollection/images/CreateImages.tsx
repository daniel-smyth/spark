import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { startCreating } from "../../../../lib/artengine/mainClient";
import ProductDescription from "../../../homepage/products/ProductDescription";
import MintImages from "./MintImages";

interface CreateImagesProps {
  name: string;
  description: string;
  size: number;
  namePrefix: string;
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
          {storing ? (
            <MintImages
              size={props.size}
              description={props.description}
              name={props.name}
              namePrefix={props.namePrefix}
              allUrls={imgSrcs}
            />
          ) : (
            <>
              <Stack
                spacing={{ base: 7, md: 8 }}
                maxW={"700px"}
                alignSelf={"center"}
                alignItems={{ base: "left", md: "center" }}
              >
                <Heading
                  display={{ md: "none" }}
                  fontSize={{ base: "2xl", md: "3xl" }}
                >
                  Artwork created
                </Heading>
                <SimpleGrid
                  display={{ base: "none", md: "grid" }}
                  width={"100%"}
                  columns={2}
                >
                  <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                    Artwork created
                  </Heading>
                  <Box align={"right"}>
                    <Text maxW={"80%"} variant="badge">
                      Create NFT Art Collection
                    </Text>
                  </Box>
                </SimpleGrid>

                <Text size="lg">
                  <Stack>
                    <Text>
                      Just connect your wallet and you're ready. Have your own
                      artwork? Upload and mint on the next page. Needing some
                      artwork? You can fill out a artwork request on the next
                      page.
                    </Text>
                  </Stack>
                </Text>
                <Button
                  minW={{ base: "100%", md: "40%" }}
                  size={"md"}
                  variant={"solid"}
                  onClick={startStoring}
                  alignSelf={"center"}
                >
                  Mint images
                </Button>
              </Stack>
            </>
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
