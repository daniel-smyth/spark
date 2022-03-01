import { NFTStorage, File } from "nft.storage";
import * as fs from "fs/promises";

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFYmUxNTBCMzQxQzdFMzMzQzNmQjg3MkVCQmYwQTJlMDlGMmJEMDgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NjA0ODA1ODc1NCwibmFtZSI6IlByb2plY3RTcGFyazIifQ.kkFtfkFzSKDAihWuH3lo6BdsXOUiUdzlXzxWrQZ3rOA";

const client = new NFTStorage({ token: NFT_STORAGE_KEY });

async function store(
  collectionSize: number,
  collectionName: string,
  imageNamePrefix: string
) {
  const basePath = process.cwd();
  const imagePath = `${basePath}/lib/artengine/outputtedartwork/images/1.png`;
  const content = await fs.readFile(imagePath);

  const f = new File([content], imagePath, { type: "image/png" });

  const cid = await client.storeBlob(f);

  return cid;
}

export async function nftStorage(
  collectionSize: number,
  collectionName: string,
  imageNamePrefix: string
) {
  const cidLinks = [];
  const basePath = process.cwd();
  for (let i = 1; i <= collectionSize; i++) {
    const imagePath = `${basePath}/lib/artengine/outputtedartwork/images/${i}.png`;
    console.log("Storing..", imagePath);
    const cid = await store(collectionSize, collectionName, imageNamePrefix);
    console.log("Stored: ", cid);
    cidLinks.push(cid);
  }
  return cidLinks;
}
