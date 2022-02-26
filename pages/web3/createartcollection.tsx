import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { buildSetup, startCreating } from "../../lib/artengine/main";
import cookie from "cookie";
import { NFTStorage, File } from "nft.storage";
import { updateArtEngineImages } from "../../lib/artengine/utils/update_info";

interface CreateArtCollectionProps {
  nftNamePrefix: string;
  nftDescription: string;
  artCollectionSize: number;
}

function CreateArtCollection(props: CreateArtCollectionProps) {
  // Load NFT storage.
  const client = new NFTStorage({
    token: process.env.NFT_STORAGE_KEY as string,
  });

  // Store image function.
  const storeImageWithIpfs = async (
    nftName: string,
    nftDescriptionm: string,
    imageData: any,
    imageName: string
  ) => {
    const metadata = await client.store({
      name: nftName,
      description: nftDescriptionm,
      image: new File([imageData], `${imageName}.jpg`, { type: "image/jpg" }),
    });
    console.log(metadata.url);
  };

  const uploadImagesToNftStorage = async () => {
    // Loop collection size to store the images.
    for (let i = 0; i < props.artCollectionSize; i++) {
      let nftName: string;
      let nftDescriptionm: string;
      let imageData: any;
      let imageName: string;
      if (nftName! && nftDescriptionm! && imageData! && imageName!)
        storeImageWithIpfs(nftName, nftDescriptionm, imageData, imageName);
      else
        throw new Error(
          `Invalid properites. NFT name: ${nftName!}, NFT description: 
          ${nftDescriptionm!}, NFT image data: ${imageData!}, image 
          name: ${imageName!}.`
        );
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
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="socialmedia" isRequired>
            <FormLabel>Social media handle</FormLabel>
            <Input type="socialmedia" />
          </FormControl>
          <Stack spacing={5} pt={2}>
            <Button size="md" variant="solid">
              Create Wallet
            </Button>
          </Stack>
          <Stack>
            <Text align={"center"} size={"md"}>
              Already a user? <Link color={"blue.400"}>Login</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default CreateArtCollection;

export async function getServerSideProps(context: any) {
  // Get the art collection information from the cookies. This is set
  // in "web3/createartcollection.tsx" using useCookie().
  let artCollectionSize: number;
  let collectionName: string;
  let collectionDescription: string;
  let imageNamePrefix: string;

  let inputError = new Error(
    `Incorrect data: ${artCollectionSize!}, ${collectionName!}, ${collectionDescription!}, ${imageNamePrefix!}`
  );

  // Parse cookie.
  const cookieObj = cookie.parse(context.req.headers.cookie);

  // Collection size.
  artCollectionSize = parseInt(`${cookieObj.artcollectionsize}`);
  if (artCollectionSize == 0) throw inputError;
  else {
    // Hashlips art engine.

    // Creates build folders.
    buildSetup();

    // Creates art.
    let artCreated = await startCreating(artCollectionSize);
    if (artCreated) {
      // Update image information.
      // Loop collection size to store the properties.
      imageNamePrefix = `${cookieObj.imagenameprefix}`;
      collectionName = `${cookieObj.collectionname}`;
      collectionDescription = `${cookieObj.collectiondescription}`;

      // Error handling.
      if (collectionName == "" || collectionDescription == "") throw inputError;

      // Updating image information.
      updateArtEngineImages(
        collectionName,
        collectionDescription,
        imageNamePrefix
      );
    }
  }

  // Return the art collection size as props to render function.
  return {
    props: {
      artCollectionSize: artCollectionSize,
      nftNamePrefix: collectionName!,
      nftDescription: collectionDescription!,
      imageNamePrefix: imageNamePrefix!,
    },
  };
}
