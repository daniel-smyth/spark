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
import Spark3Black from "../icon/spark3black";
import { downloadZip } from "../../lib/jszip/main";
import { IMint } from "../../lib/thirdweb/interfaces/IMint";
import { runHashlips } from "../../lib/hashlips/createArt";

function Mint(props: IMint) {
  const { layers } = props;
  const { name, description, primary_sale_recipient } = props.props.moduleProps;
  const { size, prefix } = props.props.mintProps;
  props.props.moduleProps.platform_fee_recipient = process.env.SPARK3_ADDRESS!;
  props.props.moduleProps.platform_fee_basis_points = 20;

  const signer = useSigner();
  const [art, setArt] = useState<any[]>([]);
  const [imgSrcs, setImgSrcs] = useState<any[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const text = `Download image files`;
  const [buttonText, setButtonText] = useState<string>(text);
  const [buttonVariant, setButtonVariant] = useState<string>("solid");

  useEffect(() => {
    // Create multiple images.
    const multiplyImgs = async () => {
      const imgSrcs: string[] = [];
      const art = await runHashlips(size, layers);
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
      for (let i = 0; i < size; i++) {
        nfts.push({
          description: description!,
          image: imgSrcs[i],
          external_url: imgSrcs[i],
          name: `${prefix} ${i + 1}`,
          attributes: allMetadata[i],
        });
      }
      // Mint.
      if (signer) {
        const sdk = new ThirdwebSDK(signer);
        console.log(props);

        const address = await sdk.deployer.deployNFTCollection(
          props.props.moduleProps
        );
        const collection = sdk.getNFTCollection(address);
        if (collection) setStarted(true);
        try {
          console.log(
            await collection.mintBatchTo(primary_sale_recipient, nfts)
          );
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

  function download() {
    setButtonText("Download starting...");
    setButtonVariant("outline");
    downloadZip(imgSrcs!, name, prefix);
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
              <Stack px={9} spacing={2} alignItems={"center"}>
                {!started ? (
                  <Heading size={"md"}>
                    Creating {name} ERC721 Collection
                  </Heading>
                ) : (
                  <Heading size="md">
                    Minting {size} Non-fungible tokens (NFTs)
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
              <Box display={{ base: "none", md: "inline" }}>
                <Spark3Black width={60} />
              </Box>
            </Stack>
          ) : (
            <Stack
              spacing={6}
              py={8}
              alignItems="center"
              justifyContent={"center"}
            >
              <Heading size={"md"}>{name} Minting Complete</Heading>
              <Stack px={9} spacing={2} alignItems={"center"}>
                <Text size="md">
                  <span style={{ fontWeight: 700 }}>
                    {size} Non-fungible tokens (NFTs)
                  </span>{" "}
                  where successfully minted to
                </Text>
                <Text>
                  <span style={{ fontWeight: 700 }}>
                    {primary_sale_recipient}
                  </span>
                  .
                </Text>
                <Text size="sm">Thank you for using spark.</Text>
              </Stack>
              <Box display={{ base: "none", md: "inline" }}>
                <Spark3Black width={60} />
              </Box>
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
              <Heading px={2} size={"md"}>
                {name} Images Mutliplied
              </Heading>
              <Button
                onClick={download}
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

export default Mint;
