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
  // Completed image srcs.
  const [imgSrcs, setImgSrcs] = useState<any[]>();
  // Minting stages.
  const [started, setStarted] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  // Download button.
  const text = `Download ${props.info.name} image files`;
  const [buttonText, setButtonText] = useState<string>(text);
  const [buttonVariant, setButtonVariant] = useState<string>("solid");

  // Minting function.
  useEffect(() => {
    const createArtwork = async () => {
      // Set image sources to display artwork.
      const setImgs = (artwork: any[]) => {
        const imgSrcs: string[] = [];
        artwork.forEach((imgData: { imgSrc: string; metadata: any }) => {
          imgSrcs.push(imgData.imgSrc);
        });
        setImgSrcs(imgSrcs);
      };
      // Set metadata array.
      const setMetadata = () => {
        const imgMetadara: any[] = [];
        artwork.forEach();
      };
      // Create NFT array with NFT metadata.
      const createNftArray = () => {
        const nfts = [];
        if (imgSrcs)
          for (let i = 1; i <= props.size; i++) {
            nfts.push({
              description: props.info.description,
              image: imgSrcs[i],
              external_url: imgSrcs[i],
              name: `${props.info.prefix}${i}.`,
              attributes: [],
            });
          }
        return nfts;
      };
      // Mint NFT array.
      const mint = async (nfts: any[]) => {
        const sdk = new ThirdwebSDK(signer!);
        const address = await sdk.deployer.deployNFTCollection({
          name: props.info.name,
          primary_sale_recipient: "0x69C16A68315f06e9c3120F5739FBCdE647055d15",
        });
        const collection = sdk.getNFTCollection(address);
        if (collection) setStarted(true);
        try {
          await collection.mintBatchTo(props.info.mintTo, nfts);
          console.timeEnd("Minting time");
          setCompleted(true);
        } catch (err) {
          console.log(err);
        }
      };

      const artwork = await runHashlips(props.size, props.layerObjs);
      setImgs(artwork);
      const nftArray = createNftArray();
      mint(nftArray);
    };
    createArtwork();
  }, [imgSrcs]);

  function downloadZip() {
    setButtonText("Download started...");
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
      {!imgSrcs ? (
        <Stack
          minH={"40vh"}
          spacing={8}
          py={6}
          alignItems="center"
          justifyContent={"center"}
        >
          <Spinner color={"blue.500"} />
          <Text size="lg">Working on it..</Text>
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
                    Creating {props.info.name} ERC721 collection contract
                  </Heading>
                ) : (
                  <Heading size="md">
                    Creating {props.size} Non-fungible tokens (NFTs).
                  </Heading>
                )}
                <Text size="lg">
                  You will be asked to confirm two transactions.
                </Text>
                <Text size="sm">
                  This may take a few minutes. Do not leave this page.
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
              <Heading size={"md"}>
                {props.info.name} Collection Complete
              </Heading>
              <Stack spacing={2} alignItems="center">
                <Text size="md">
                  <span style={{ fontWeight: 700 }}>{props.size}</span>{" "}
                  Non-fungible tokens (NFTs) minted
                </Text>
                <Text>
                  Minted to{" "}
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
