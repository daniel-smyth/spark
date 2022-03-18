import React, { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useSigner } from "@thirdweb-dev/react";
import {
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { runHashlips } from "../../../lib/hashlips/createArt";
import { downloadJSZip } from "../../../lib/jszip/download";

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
  const [buttonText, setButtonText] = useState<string>("Download Collection");
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
        collection.estimator;

        console.time("Minting time");
        console.log(`Minting ${props.info.size} images.`);

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
          console.log(await collection.mintBatchTo(props.info.mintTo, nfts));
          console.timeEnd("Minting time");
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
          minH={"50vh"}
          spacing={8}
          py={6}
          alignItems="center"
          justifyContent={"center"}
        >
          <Spinner color={"blue.500"} />
          <Stack alignItems="center">
            <Text size="lg">Creating {props.info.size} images.</Text>
          </Stack>
        </Stack>
      ) : (
        <>
          {!mintComplete ? (
            <Stack
              minH={"50vh"}
              spacing={8}
              py={6}
              alignItems="center"
              justifyContent={"center"}
            >
              <Spinner color={"blue.500"} />
              <Stack alignItems="center">
                <Text size="lg">Minting {props.info.size} images.</Text>
                <Text size="md">This may take a few minutes.</Text>
              </Stack>
            </Stack>
          ) : (
            <Stack maxW={"100%"} px={8} py={10} spacing={6}>
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
                </Heading>{" "}
                <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                  That's it!
                </Heading>
                <Stack spacing={1} align={"center"}>
                  <Text size="lg">
                    You just minted {props.info.size} NFTs to{" "}
                    {props.info.mintTo.substring(0, 15)}...
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          )}
          <Stack spacing={2} border={"8px"} p={2} borderColor="gray.200">
            <Flex py={4}>
              <Heading pr={10} pl={4} fontSize={{ base: "2xl", md: "3xl" }}>
                {props.info.name}
              </Heading>
              <Button
                onClick={downloadZip}
                variant={buttonVariant}
                maxW={"250px"}
                size={"md"}
                alignSelf={"right"}
              >
                {buttonText}
              </Button>
            </Flex>
            <Wrap p={4}>{imageComponents}</Wrap>
          </Stack>
        </>
      )}
    </>
  );
}

export default Create;
