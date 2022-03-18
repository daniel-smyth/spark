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
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>That's it!</Heading>
            <Stack spacing={1} align={"center"}>
              <Text size="lg">
                You just started to mint {props.info.size} NFTs to{" "}
                {props.info.mintTo.substring(0, 15)}...
              </Text>
              <Text display={"flex"} alignItems={"center"} size="lg">
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
    </>
  );
}

export default CreateImages;
