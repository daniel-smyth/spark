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

function Create(props: CreateCollectionProps) {
  const signer = useSigner();
  const [imgSrcs, setImgSrcs] = useState<string[]>();
  const [moduleInitialised, setModuleInitialised] = useState<boolean>(false);
  const [mintComplete, setMintComplete] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>(
    `Download ${props.info.name} image files`
  );
  const [buttonVariant, setButtonVariant] = useState<string>("solid");

  useEffect(() => {
    // Step 1: Artwork created.
    const createArtwork = async () =>
      setImgSrcs(await runHashlips(props.info.size, props.layerObjs));

    if (!imgSrcs) createArtwork();

    if (imgSrcs && signer && !mintComplete) {
      const sdk = new ThirdwebSDK(signer!);

      const mint = async () => {
        const address = await sdk.deployer.deployNFTCollection({
          name: props.info.name,
          primary_sale_recipient: props.info.saleRecipient,
        });

        // Step 2: Module created.
        const collection = sdk.getNFTCollection(address);
        if (collection) setModuleInitialised(true);
        console.log("Collection module: ", collection.estimator);

        console.time("Minting time");
        console.log(`Starting to mint ${props.info.size} images.`);

        const nfts = [];
        for (let i = 1; i <= props.info.size; i++) {
          nfts.push({
            description: props.info.description,
            image: imgSrcs[i],
            external_url: imgSrcs[i],
            name: `${props.info.prefix}${i}.`,
          });
        }

        try {
          // Step 3: Mint collection..
          console.log(`Minting ${props.info.size} images.`);
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
                    Creating {props.info.size} Non-fungible tokens (NFTs).
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
                  <span style={{ fontWeight: 700 }}>{props.info.size}</span>{" "}
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
