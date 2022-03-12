import { ethers } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ICreateDropV1 } from "./ICreateDropV1";

/**
 * Creates a drop module on my ThirdWeb dashboard using my private key. This will
 * work but I am the one paying the gas fees to mint the collection. Alternatively
 * I could use their wallet but then I would need the ability to create modules
 * manually.
 *
 * @param options ICreateDropV1
 */
export async function createDropV1(options: ICreateDropV1) {
  // ! Initialises sdk with personal wallet’s private keys.
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(process.env.PRIVATE_KEY!, options.provider)
  );

  // Instantiate pre-defined NFT Drop Module.
  const drop = sdk.getDropModule("0xb114629570497AE1dC5e651586670aba7483F467");

  // Run a for loop of a user inputted amount minting an NFT every time.
  console.log(`Starting to mint ${options.size} images.`);
  const nfts = [];
  for (let i = 1; i <= options.size; i++) {
    nfts.push({
      name: `${options.prefix}${i}`,
      description: options.description,
      image: options.imgSrcs[i],
      properties: {
        // populate with layer names
      },
    });
  }

  // Mint as batch.
  try {
    await drop.createBatch(nfts);
  } catch (err) {
    console.log(err);
  }
}
