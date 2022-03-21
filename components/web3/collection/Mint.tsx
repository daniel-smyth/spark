import React, { useEffect, useState } from "react";
import { NFTContractDeployMetadata, ThirdwebSDK } from "@thirdweb-dev/sdk";
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
  const signer = useSigner();
  const [imgs, setImgs] = useState<any[]>();
  const [artwork, setArtwork] = useState<any>();
  const [moduleInitialised, setModuleInitialised] = useState<boolean>(false);
  const [mintComplete, setMintComplete] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>(
    `Download ${props.info.name} image files`
  );
  const [buttonVariant, setButtonVariant] = useState<string>("solid");

  useEffect(() => {
    // Step 1: Artwork created.
    const createArtwork = async () => {
      const artwork = await runHashlips(props.size, props.layerObjs);
      setArtwork(artwork);

      const imgSrcs: any[] = [];
      artwork[1].forEach((piece) => {
        imgSrcs.push(piece.image);
      });
      setImgs(imgSrcs);
    };

    if (!imgs) createArtwork();

    if (artwork && imgs && signer && !mintComplete) {
      const sdk = new ThirdwebSDK(signer!);

      const mint = async () => {
        console.time("Minting time");
        console.log(`Starting to mint ${props.size} images.`);

        // Step 2: Create NFTs with meta data.
        const nfts = [];
        for (let i = 1; i <= props.size; i++) {
          let metadata = artwork[1][i].metadata;
          nfts.push({
            description: props.info.description,
            image: imgs[i],
            external_url: imgs[i],
            name: `${props.info.prefix}${i}.`,
            attributes: [metadata],
          });
        }
        console.log(nfts);

        const address = await sdk.deployer.deployNFTCollection({
          name: props.info.name,
          primary_sale_recipient: "0x69C16A68315f06e9c3120F5739FBCdE647055d15",
        });

        // Step 3: Module created.
        const collection = sdk.getNFTCollection(address);
        if (collection) setModuleInitialised(true);
        console.log("Collection module: ", collection.estimator);

        try {
          // Step 4: Mint collection..
          console.log(`Minting ${props.size} images.`);
          console.log(await collection.mintBatchTo(props.info.mintTo, nfts));
          console.timeEnd("Minting time");
          // Step 4: Mint complete.
          setMintComplete(true);
        } catch (err) {
          console.log(err);
        }
      };

      mint();
    }
  }, [imgs]);

  function downloadZip() {
    setButtonText("Download started...");
    setButtonVariant("outline");
    downloadJSZip(imgs!, props.info.name, props.info.prefix);
  }

  // Renders the image results.
  const imageComponents: any[] = [];
  if (imgs)
    for (let i = 0; i < imgs.length; i++)
      imageComponents.push(<Image key={i} maxW={"70px"} src={imgs[i]} />);

  return (
    <>
      {!imgs ? (
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
          {!mintComplete ? (
            <Stack
              spacing={10}
              py={8}
              alignItems="center"
              justifyContent={"center"}
            >
              <Spinner color={"blue.500"} />
              <Stack spacing={2} alignItems={"center"}>
                {!moduleInitialised ? (
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
