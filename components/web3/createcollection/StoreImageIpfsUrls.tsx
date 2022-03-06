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

  useEffect(() => {
    nftStorage();

    async function nftStorage() {
      for (let i = 0; i < props.size; i++) {
        const imagePath = props.allUrls[i];
        console.log("Storing..", imagePath);
        const cid = await store(imagePath);
        console.log("Stored: ", cid);
        cidLinks.push(cid);
        setCidLinks(cidLinks);
      }
    }

    async function store(imagePath: string) {
      const content = await fetchImage(imagePath);
      const f = new File([content], imagePath, { type: "image/png" });
      const cid = await client.storeBlob(f);
      return cid;
    }

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
    <Stack maxW={"100%"} spacing={6}>
      <Heading fontSize={{ base: "2xl", md: "3xl" }}>
        Storing {props.name} Collection
      </Heading>
      <Text size="lg">Storing {props.size} images... </Text>
      <Box border={"8px"} p={2} borderColor="gray.200">
        {cidLinks.map((cid) => {
          <Text size="md">Stored: {cid}</Text>;
        })}
      </Box>
    </Stack>
  );
}

export default StoreImageIpfsUrls;
