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
import DownloadImages from "./Download";
import MintImagesV2 from "./Mint";

interface CreateImagesProps {
  info: {
    size: number;
    name: string;
    description: string;
    prefix: string;
    mintTo: string;
    saleRecipient: string;
  };
  layerObjs: any[];
}

function CreateImages(props: CreateImagesProps) {
  const [imgSrcs, setImgSrcs] = useState<string[]>();
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  useEffect(() => {
    // Run Hashlips art engine and add the img results to this state.
    const createImages = async () => {
      // Hashlips.
      const images = await startCreating(props.info.size, props.layerObjs);
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
              <MintImagesV2
                size={props.info.size}
                name={props.info.name}
                description={props.info.description}
                prefix={props.info.prefix}
                mintAddress={props.info.mintTo}
                saleRecipient={props.info.saleRecipient}
                imgSrcs={imgSrcs}
              />
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                That's it!
              </Heading>
              <Stack spacing={1} align={"center"}>
                <Text size="lg">
                  You just started to mint {props.info.size} NFTs to{" "}
                  {props.info.mintTo.substring(0, 15)}...
                </Text>
                <Text
                  variant="bold"
                  display={"flex"}
                  alignItems={"center"}
                  size="lg"
                >
                  DO NOT LEAVE THIS PAGE.
                </Text>
                <Text
                  variant="bold"
                  display={"flex"}
                  alignItems={"center"}
                  size="lg"
                >
                  You will be asked to confirm two MetaMask transactions.
                </Text>
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
                    name={props.info.name}
                    prefiz={props.info.prefix}
                  />
                  <Button
                    minW={{ base: "100%", md: "40%" }}
                    size={"md"}
                    variant={"outline"}
                    onClick={handleClick}
                    alignSelf={"center"}
                  >
                    Download starting..
                  </Button>
                  <Text size={"md"}>
                    Creating zip file.. This can also take a few minutes..
                  </Text>
                </>
              )}
            </Stack>
          </>

          <Stack spacing={2} border={"8px"} p={2} borderColor="gray.200">
            <Heading pl={4} fontSize={{ base: "2xl", md: "3xl" }}>
              {props.info.name}
            </Heading>
            <Wrap p={4}>{imageComponents}</Wrap>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default CreateImages;
