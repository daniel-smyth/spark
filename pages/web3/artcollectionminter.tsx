import cookie from "cookie";
import { useWeb3 } from "@3rdweb/hooks";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { createAndStoreArtwork } from "../../lib/createAndStoreArtwork";
import { mintNftCollection } from "../../lib/mintartcollection";
import ButtonWithLoading from "../../components/utils/ButtonWithLoading";

function ArtCollectionMinter(props: any) {
  // Currently connected blockchain provider.
  const { provider } = useWeb3();

  async function createCollection() {
    await mintNftCollection(
      provider,
      props.urlArray,
      props.collectionSize,
      props.collectionDescription,
      props.imageNamePrefix
    );
  }

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
          <ButtonWithLoading
            buttontext={"Mint NFTs"}
            onClick={createCollection}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

export default ArtCollectionMinter;

export async function getServerSideProps(context: any) {
  // Get the art collection information from the cookies. This is set
  // in "web3/createartcollection.tsx" using useCookie().
  const cookieObj = cookie.parse(context.req.headers.cookie);

  let props = {
    collectionSize: 0,
    collectionDescription: "",
    imageNamePrefix: "",
    urlArray: "",
  };

  // IPFS URLs and collection details
  const result = await createAndStoreArtwork(cookieObj);

  if (result) {
    props = result;
    return {
      props: result,
    };
  } else throw new Error("Incorrect cookie object: " + cookieObj);
}
