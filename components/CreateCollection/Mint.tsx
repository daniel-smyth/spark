/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { NFTContractDeployMetadata, ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useSigner } from '@thirdweb-dev/react';
import {
  Box,
  Button,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Wrap
} from '@chakra-ui/react';
import { ProcessedImage } from '../../types/CreateCollection';
import downloadZip from '../../lib/jszip/main';
import multiplyArtwork from '../../lib/hashlips/multiplyArtwork';
import useCreateCollection from '../../hooks/useCreateCollection';
import Spark3Black from '../Icon/spark3black';
import { runHashlips } from '../../lib/hashlips/createArt';

function Mint() {
  const { layers, collectionProperties, collectionSize } =
    useCreateCollection();
  const [processedArt, setProcessedArt] = useState<ProcessedImage[]>([]);

  // const [started, setStarted] = useState<boolean>(false);
  // const [completed, setCompleted] = useState<boolean>(false);
  // const text = `Download image files`;
  // const [buttonText, setButtonText] = useState<string>(text);
  // const [buttonVariant, setButtonVariant] = useState<string>('solid');
  // const signer = useSigner();

  useEffect(() => {
    // Combine random combinations of artwork with Hashlips
    const multiply = async () => {
      const multipliedArtwork: ProcessedImage[] = await multiplyArtwork(
        layers,
        collectionSize
      );

      setProcessedArt(multipliedArtwork);
    };

    multiply();

    return () => {
      setProcessedArt([]);
    };
  }, [collectionSize]);

  // useEffect(() => {
  //   const mint = async () => {
  //     const nfts = processedArt!.map((imgData, i) => {
  //       const metaObject: { [key: string]: string } = {};

  //       imgData.metadata.forEach((traitAndType) => {
  //         const trait = traitAndType[0];
  //         const type = traitAndType[1];

  //         metaObject[trait] = type;
  //       });

  //       return {
  //         description: collectionProperties?.description,
  //         image: imgData.imgSrc,
  //         external_url: imgData.imgSrc,
  //         name: `${collectionProperties?.prefix} ${i + 1}`,
  //         attributes: metaObject
  //       };
  //     });

  //     if (signer) {
  //       const sdk = new ThirdwebSDK(signer);

  //       const deployProps = {
  //         ...collectionProperties
  //       };

  //       delete deployProps.size;
  //       delete deployProps.prefix;

  //       const address = await sdk.deployer.deployNFTCollection(
  //         deployProps as NFTContractDeployMetadata
  //       );

  //       const collection = await sdk.getNFTCollection(address);

  //       if (collection) setStarted(true);

  //       try {
  //         console.log(
  //           await collection.mintBatchTo(
  //             collectionProperties?.primary_sale_recipient!,
  //             nfts
  //           )
  //         );

  //         console.timeEnd('Minting time');

  //         setCompleted(true);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   };

  //   if (processedArt.length > 0) mint();
  // }, [collectionProperties, processedArt, signer]);

  // function download() {
  //   setButtonText('Download starting...');
  //   setButtonVariant('outline');

  //   const srcs = processedArt.map((artwork) => artwork.imgSrc);

  //   downloadZip(srcs, collectionProperties?.name, collectionProperties?.prefix);
  // }

  return processedArt.length === 0 ? (
    <Stack
      minH="40vh"
      spacing={8}
      py={6}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="blue.500" />
      <Stack spacing={1}>
        <Text size="lg">Multipling images</Text>
        <Text size="sm">This may take a while</Text>
      </Stack>
    </Stack>
  ) : (
    <>
      {/* {!completed ? (
        <Stack spacing={10} py={8} alignItems="center" justifyContent="center">
          <Spinner color="blue.500" />
          <Stack px={9} spacing={2} alignItems="center">
            {!started ? (
              <Heading size="md">
                Creating {collectionProperties?.name} ERC721 Collection
              </Heading>
            ) : (
              <Heading size="md">
                Minting {collectionProperties?.size} Non-fungible tokens (NFTs)
              </Heading>
            )}
            <Text size="lg">You will be asked to confirm two transactions</Text>
            <Text size="sm">
              This can take up to an hour depending on size do not leave page
            </Text>
          </Stack>
          <Box display={{ base: 'none', md: 'inline' }}>
            <Spark3Black width={60} />
          </Box>
        </Stack>
      ) : (
        <Stack spacing={6} py={8} alignItems="center" justifyContent="center">
          <Heading size="md">
            {collectionProperties?.name} Minting Complete
          </Heading>
          <Stack px={9} spacing={2} alignItems="center">
            <Text size="md">
              <span style={{ fontWeight: 700 }}>
                {collectionSize} Non-fungible tokens (NFTs)
              </span>{' '}
              where successfully minted to
            </Text>
            <Text>
              <span style={{ fontWeight: 700 }}>
                {collectionProperties?.primary_sale_recipient}
              </span>
              .
            </Text>
            <Text size="sm">Thank you for using spark.</Text>
          </Stack>
          <Box display={{ base: 'none', md: 'inline' }}>
            <Spark3Black width={60} />
          </Box>
        </Stack>
      )}
      <Box px={8} pb={24}>
        <Stack
          alignItems="center"
          spacing={6}
          border="4px"
          p={6}
          borderColor="gray.200"
        >
          <Heading px={2} size="md">
            {collectionProperties?.name} Images Mutliplied
          </Heading>
          <Button
            onClick={() => download()}
            variant={buttonVariant}
            size="md"
            alignSelf="right"
          >
            {buttonText}
          </Button>
          <Wrap>
            {processedArt?.map((artwork) => (
              <Image key={artwork.imgSrc} maxW="70px" src={artwork.imgSrc} />
            ))}
          </Wrap>
        </Stack>
      </Box> */}
    </>
  );
}

export default Mint;
