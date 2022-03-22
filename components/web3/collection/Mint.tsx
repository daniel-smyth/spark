import React, { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useSigner } from "@thirdweb-dev/react";
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
import { runHashlips } from "../../../lib/hashlips/createArt";
import { downloadJSZip } from "../../../lib/jszip/download";
import Spark3Black from "../../logo/spark3black";

interface CreateCollectionProps {
  size: number;
  info: {
    name: string;
    description: string;
    prefix: string;
    mintTo: string;
    saleRecipient: string;
  };
  layerObjs: any[];
}

function Create(props: CreateCollectionProps) {
  // Web3.
  const signer = useSigner();
  // Artwork.
  const [art, setArt] = useState<any[]>([]);
  // Completed image srcs.
  const [imgSrcs, setImgSrcs] = useState<any[]>([]);
  // Minting stages.
  const [started, setStarted] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  // Download button.
  const text = `Download ${props.info.name} image files`;
  const [buttonText, setButtonText] = useState<string>(text);
  const [buttonVariant, setButtonVariant] = useState<string>("solid");

  // Minting function.
  useEffect(() => {
    // Create multiple images.
    const multiplyImgs = async () => {
      const imgSrcs: string[] = [];
      const art = await runHashlips(props.size, props.layerObjs);
      art.forEach((imgData: { imgSrc: string; metadata: any }) => {
        imgSrcs.push(imgData.imgSrc);
      });
      setImgSrcs(imgSrcs);
      setArt(art);
    };

    // Mint.
    const mint = async () => {
      const nfts = [];
      const allMetadata: any[] = [];
      // Create metadata.
      art.forEach((imgData: { imgSrc: string; metadata: any }) => {
        const metadata = imgData.metadata;
        const traitType: string = metadata[0][0];
        const value: string = metadata[0][1];
        const imgMetadata = {
          [traitType]: value,
        };
        metadata.forEach((traits: string[], i: number) =>
          i != 0 ? (imgMetadata[traits[0]] = traits[1]) : null
        );
        allMetadata.push(imgMetadata);
      });
      // Create NFT array.
      for (let i = 0; i < props.size; i++) {
        nfts.push({
          description: props.info.description,
          image: imgSrcs[i],
          external_url: imgSrcs[i],
          name: `${props.info.prefix} ${i + 1}`,
          attributes: allMetadata[i],
        });
      }
      // Mint.
      if (signer) {
        const sdk = new ThirdwebSDK(signer);
        const address = await sdk.deployer.deployNFTCollection({
          name: props.info.name,
          primary_sale_recipient: "0x69C16A68315f06e9c3120F5739FBCdE647055d15",
        });
        const collection = sdk.getNFTCollection(address);
        if (collection) setStarted(true);
        try {
          console.log(await collection.mintBatchTo(props.info.mintTo, nfts));
          console.timeEnd("Minting time");
          setCompleted(true);
        } catch (err) {
          console.log(err);
        }
      }
    };

    if (art.length == 0) multiplyImgs();
    if (!started) mint();
  }, [art]);

  function downloadZip() {
    setButtonText("Download starting...");
    setButtonVariant("outline");
    downloadJSZip(imgSrcs!, props.info.name, props.info.prefix);
  }

  // Renders the image results.
  const imageComponents: any[] = [];
  if (imgSrcs)
    for (let i = 0; i < imgSrcs.length; i++)
      imageComponents.push(<Image key={i} maxW={"70px"} src={imgSrcs[i]} />);

  return (
    <>
      {imgSrcs.length == 0 ? (
        <Stack
          minH={"40vh"}
          spacing={8}
          py={6}
          alignItems="center"
          justifyContent={"center"}
        >
          <Spinner color={"blue.500"} />
          <Stack spacing={1}>
            <Text size="lg">Multipling images</Text>
            <Text size="sm">This may take a while</Text>
          </Stack>
        </Stack>
      ) : (
        <>
          {!completed ? (
            <Stack
              spacing={10}
              py={8}
              alignItems="center"
              justifyContent={"center"}
            >
              <Spinner color={"blue.500"} />
              <Stack spacing={2} alignItems={"center"}>
                {!started ? (
                  <Heading size={"md"}>
                    Creating {props.info.name} ERC721 Collection
                  </Heading>
                ) : (
                  <Heading size="md">
                    Minting {props.size} Non-fungible tokens (NFTs)
                  </Heading>
                )}
                <Text size="lg">
                  You will be asked to confirm two transactions
                </Text>
                <Text size="sm">
                  This can take up to an hour depending on size do not leave
                  page
                </Text>
              </Stack>
              <Spark3Black width={60} />
            </Stack>
          ) : (
            <Stack
              spacing={6}
              py={8}
              alignItems="center"
              justifyContent={"center"}
            >
              <Heading size={"md"}>{props.info.name} Minting Complete</Heading>
              <Stack spacing={2} alignItems="center">
                <Text size="md">
                  <span style={{ fontWeight: 700 }}>
                    {props.size} Non-fungible tokens (NFTs)
                  </span>{" "}
                  where successfully minted to
                </Text>
                <Text>
                  <span style={{ fontWeight: 700 }}>{props.info.mintTo}</span>.
                </Text>
                <Text size="sm">Thank you for using spark.</Text>
              </Stack>
              <Spark3Black width={60} />
            </Stack>
          )}
          <Box px={8} pb={24}>
            <Stack
              alignItems={"center"}
              spacing={6}
              border={"4px"}
              p={6}
              borderColor="gray.200"
            >
              <Heading size={"md"}>{props.info.name} Images Mutliplied</Heading>
              <Button
                onClick={downloadZip}
                variant={buttonVariant}
                size={"md"}
                alignSelf={"right"}
              >
                {buttonText}
              </Button>
              <Wrap>{imageComponents}</Wrap>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}

export default Create;
