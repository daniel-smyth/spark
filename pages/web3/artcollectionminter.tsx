import cookie from "cookie";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import ButtonWithLoading from "../../components/utils/ButtonWithLoading";
import { createAndStoreArtwork } from "../../lib/artcollection";

interface CreateArtCollection {
  urlArray: string;
  collectionSize: number;
  collectionDescription: string;
  imageNamePrefix: string;
}

function CreateArtCollection(props: CreateArtCollection) {
  // Currently connected blockchain provider.
  const { provider } = useWeb3();

  /**
   * ! WARNING
   * * Write blockchain (backend)
   * Initialises sdk with personal wallet’s private keys.
   * This method should be used with extreme care on the backend.
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
  const cookieObj = cookie.parse(context.req.headers.cookie);

  // IPFS URLs and collection details
  const result = await createAndStoreArtwork(cookieObj);

  if (result) {
    return {
      props: result,
    };
  } else throw new Error("Incorrect cookie object: " + cookieObj);
}
