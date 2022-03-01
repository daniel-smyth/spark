import { NFTStorage, File } from "nft.storage";
import * as fs from "fs/promises";

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

/**
 * Stores image as a Blob on NFT.storage. Returns the IPFS CID link.
 *
 * @param {string} imagePath
 * @returns IPFS CID link
 */
async function store(imagePath) {
  const content = await fs.readFile(imagePath);
  const f = new File([content], imagePath, { type: "image/png" });
  const cid = await client.storeBlob(f);
  return cid;
}

/**
 * Stores images created by art engine on NFT.storage. Then returns
 * the IPFS CID links.
 *
 * @param {number} collectionSize art collection size
 * @returns IPFS CID links
 */
export async function nftStorage(collectionSize) {
  const cidLinks = [];
  const basePath = process.cwd();
  for (let i = 1; i <= collectionSize; i++) {
    const imagePath = `${basePath}/lib/artengine/outputtedartwork/images/${i}.png`;
    console.log("Storing..", imagePath);
    const cid = await store(imagePath);
    console.log("Stored: ", cid);
    cidLinks.push(cid);
  }
  return cidLinks;
}
