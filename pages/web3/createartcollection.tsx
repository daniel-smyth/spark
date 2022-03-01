import React from "react";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { buildSetup, startCreating } from "../../lib/artengine/main";
import cookie from "cookie";
import { updateArtEngineImages } from "../../lib/artengine/utils/update_info";
import ButtonWithLoading from "../../components/utils/ButtonWithLoading";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { useWeb3 } from "@3rdweb/hooks";
import { nftStorage } from "../../lib/nftstorage/main";

function CreateArtCollection(props: any) {
  // Currently connected blockchain provider.
  const { provider } = useWeb3();

  /**
   * ! WARNING
   * * Write blockchain (backend)
   * Initialises sdk with personal wallet’s private keys.
   * This method should be used with extreme care on the backend.
   * Do not 'push' with .ENV. Only for if you wish to mint the NFT.
   */
  const writeSdk = new ThirdwebSDK(
    new ethers.Wallet(
      // Your wallet private key
      process.env.PRIVATE_KEY as string,
      // RPC URL
      provider
    )
  );

  // Assign the drop module address.
  const nft_smart_contract_address =
    "0xb114629570497AE1dC5e651586670aba7483F467";

  // Instantiate NFT Drop Module.
  const drop = writeSdk.getDropModule(nft_smart_contract_address);

  // Run a for loop of a user inputted amount minting an NFT every time.
  const lazyMintNft = async () => {
    console.log("Begin mint...");
    const ipfsUrlArray = JSON.parse(props.urlArray);

    for (let i = 1; i <= props.collectionSize; i++) {
      console.log(`Now minting ${i}...`);
      try {
        await drop.createBatch([
          {
            name: `${props.imageNamePrefix}${i}.`,
            description: `${props.collectionDescription}`,
            image: `https://ipfs.io/ipfs/${ipfsUrlArray[i - 1]}`,
            properties: {},
          },
        ]);
      } catch (err) {
        console.log(err);
      }

      console.log(drop.getAll());
    }
  };

  return (
    <Stack
      spacing={6}
      py={10}
      pb={20}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <ButtonWithLoading buttontext={"Mint NFTs"} onClick={lazyMintNft} />
        </Stack>
      </Box>
    </Stack>
  );
}

export default CreateArtCollection;

export async function getServerSideProps(context: any) {
  // Get the art collection information from the cookies. This is set
  // in "web3/createartcollection.tsx" using useCookie().
  // Parse cookie.
  const cookieObj = cookie.parse(context.req.headers.cookie);

  // * USE CONFIG.JS TO SET THESE VARIABLES WITH USER INPUT

  // Collection size.
  var collectionSize = parseInt(`${cookieObj.collectionsize}`);
  var imageNamePrefix = `${cookieObj.imagenameprefix}`;
  var collectionName = `${cookieObj.collectionname}`;
  var collectionDescription = `${cookieObj.collectiondescription}`;

  if (
    collectionSize &&
    imageNamePrefix &&
    collectionName &&
    collectionDescription
  ) {
    // Hashlips
    // Build the require output folders for images.
    buildSetup();
    // Create iamges.
    await startCreating(collectionSize);
    // Update image meta data.
    updateArtEngineImages(
      collectionName,
      collectionDescription,
      imageNamePrefix
    );

    // nft.storage
    var ipfsUrlArray = await nftStorage(
      collectionSize,
      collectionName,
      imageNamePrefix
    );

    var arrayString = JSON.stringify(ipfsUrlArray);

    // Return the art collection size as props to render function.
    return {
      props: {
        urlArray: arrayString,
        collectionSize: collectionSize,
        collectionName: collectionName,
        collectionDescription: collectionDescription,
        imageNamePrefix: imageNamePrefix,
      },
    };
  } else
    throw new Error(
      `Incorrect data: "${collectionSize}", "${collectionName}", "${collectionDescription}", "${imageNamePrefix}"`
    );
}
