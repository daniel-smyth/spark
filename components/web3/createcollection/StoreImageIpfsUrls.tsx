import { Stack, Heading, Box, Text } from "@chakra-ui/react";
import { CIDString, NFTStorage } from "nft.storage";
import React, { useEffect, useState } from "react";
import { loadImage } from "canvas";

interface StoreImageIpfsUrlsProps {
  size: number;
  name: string;
  allUrls: string[];
}

function StoreImageIpfsUrls(props: StoreImageIpfsUrlsProps) {
  const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! });
  const [cidLinks, setCidLinks] = useState<string[]>([]);

  function addCidLink(cid: CIDString) {
    cidLinks.push(cid);
    setCidLinks(cidLinks);
  }

  const cidLinkComponents = [];
  for (let i = 0; i < cidLinks.length; i++) {
    const cidLink = cidLinks[i];
    cidLinkComponents.push(<Text size="md">Stored: {cidLink}</Text>);
  }

  useEffect(() => {
    // Start storing.
    nftStorage();

    /**
     * Stores images created by art engine on NFT.storage. Then returns
     * the IPFS CID links.
     *
     * @param {number} collectionSize art collection size
     * @returns IPFS CID links
     */
    async function nftStorage() {
      for (let i = 0; i < props.size; i++) {
        const imagePath = props.allUrls[i];
        console.log("Storing..", imagePath);
        const cid = await store(imagePath);
        console.log("Stored: ", cid);
        addCidLink(cid);
      }
    }

    /**
     * Stores image as a Blob on NFT.storage. Returns the IPFS CID link.
     *
     * @param {string} imagePath
     * @returns IPFS CID link
     */
    async function store(imagePath: string) {
      const content = await fetchImage(imagePath);
      const f = new File([content], imagePath, { type: "image/png" });
      const cid = await client.storeBlob(f);
      return cid;
    }

    /**
     * Uses canvas node module to fetch image from URL.
     *
     * @param {string} imagePath image path
     * @returns image
     */
    async function fetchImage(imagePath: string): Promise<any> {
      try {
        return new Promise(async (resolve) => {
          const image = await loadImage(imagePath);
          resolve(image);
        });
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }
  }, []);

  return (
    <Stack maxW={"100%"} px={8} py={10} spacing={6}>
      <Heading fontSize={{ base: "2xl", md: "3xl" }}>
        {props.name} Collection
      </Heading>
      <Text size="lg">Storing {props.size} images... </Text>
      <Box border={"8px"} p={2} borderColor="gray.200">
        {cidLinkComponents}
      </Box>
    </Stack>
  );
}

export default StoreImageIpfsUrls;
