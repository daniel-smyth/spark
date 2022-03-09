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
import { startCreating } from "../../../../lib/artengine/mainClient";
import DownloadImages from "./DownloadImages";

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
  const [downloadInitiated, setDownloadInitiated] = useState(false);

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

  function handleClick() {
    if (imgSrcs) setDownloadInitiated(true);
  }

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
        <>
          <Stack maxW={"100%"} px={8} py={10} spacing={6}>
            {/* <MintImages
              size={props.size}
              description={props.description}
              name={props.name}
              namePrefix={props.namePrefix}
              allUrls={imgSrcs}
            /> */}
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
                      collectionName={props.name}
                      imageNamePrefix={props.namePrefix}
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
        </>
      )}
    </>
  );
}

export default CreateImages;
