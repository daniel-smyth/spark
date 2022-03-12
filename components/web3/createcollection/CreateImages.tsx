import {
  Button,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { startCreating } from "../../../lib/hashlips/createArt";
import DownloadImages from "./DownloadImages";
import MintImagesV1 from "./MintImagesV1";

interface CreateImagesProps {
  name: string;
  description: string;
  size: number;
  prefix: string;
  layerObjs: any[];
  imgSrcs: any;
}

function CreateImages(props: CreateImagesProps) {
  const [imgSrcs, setImgSrcs] = useState<string[]>();
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  useEffect(() => {
    // Run Hashlips art engine and add the img results to this state.
    const createImages = async () => {
      // Hashlips.
      const images = await startCreating(props.size, props.layerObjs);

      // Set parent state.
      props.imgSrcs(images);

      // Set this this state to display the images.
      setImgSrcs(images);
    };

    createImages(); // run
  }, []);

  // Renders the download component initiating download of ZIP containing images.
  function handleClick() {
    if (imgSrcs) setDownloadInitiated(true);
  }

  // Renders the image results.
  const imageComponents: any[] = [];
  if (imgSrcs)
    for (let i = 0; i < imgSrcs.length; i++)
      imageComponents.push(<Image key={i} maxW={"70px"} src={imgSrcs[i]} />);

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
          <>
            <Stack
              spacing={6}
              maxW={"700px"}
              alignSelf={"center"}
              alignItems={"center"}
            >
              <Heading
                display={{ md: "none" }}
                fontSize={{ base: "2xl", md: "3xl" }}
              >
                Artwork created
              </Heading>

              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                That's it!
              </Heading>
              <Stack spacing={1} align={"center"}>
                <Text size="lg">You just minted {props.size} NFTs.</Text>
                <Text display={"flex"} alignItems={"center"} size="lg">
                  NFT token addresses will be emailed within 24 hours.
                </Text>
                <MintImagesV1
                  size={props.size}
                  name={props.name}
                  description={props.description}
                  prefix={props.prefix}
                  imgSrcs={imgSrcs}
                />
              </Stack>
              {!downloadInitiated ? (
                <Button
                  minW={{ base: "100%", md: "40%" }}
                  size={"md"}
                  variant={"solid"}
                  onClick={handleClick}
                  alignSelf={"center"}
                >
                  Download images
                </Button>
              ) : (
                <>
                  <DownloadImages
                    imgSrcs={imgSrcs}
                    name={props.name}
                    prefiz={props.prefix}
                  />
                  <Button
                    minW={{ base: "100%", md: "40%" }}
                    size={"md"}
                    variant={"outline"}
                    onClick={handleClick}
                    alignSelf={"center"}
                  >
                    Download started
                  </Button>
                </>
              )}
            </Stack>
          </>

          <Stack spacing={2} border={"8px"} p={2} borderColor="gray.200">
            <Heading pl={4} fontSize={{ base: "2xl", md: "3xl" }}>
              {props.name}
            </Heading>
            <Wrap p={4}>{imageComponents}</Wrap>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default CreateImages;
