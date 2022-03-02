import { ethers } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";

export async function mintNftCollection(
  provider,
  urlArray,
  collectionSize,
  collectionDescription,
  imageNamePrefix
) {
  /**
   * ! WARNING
   * * Write blockchain (backend)
   * Initialises sdk with personal wallet’s private keys.
   * This method should be used with extreme care on the backend.
   */
  const writeSdk = new ThirdwebSDK(
    new ethers.Wallet(
      // Your wallet private key
      process.env.PRIVATE_KEY,
      // RPC URL
      provider
    )
  );

  // Instantiate NFT Drop Module.
  const drop = writeSdk.getDropModule(
    "0xb114629570497AE1dC5e651586670aba7483F467"
  );

  // Run a for loop of a user inputted amount minting an NFT every time.
  console.log("Begin mint...");
  const ipfsUrlArray = JSON.parse(urlArray);
  for (let i = 1; i <= collectionSize; i++) {
    console.log(`Now minting ${i}...`);
    try {
      await drop.createBatch([
        {
          name: `${imageNamePrefix}${i}.`,
          description: `${collectionDescription}`,
          image: `https://ipfs.io/ipfs/${ipfsUrlArray[i - 1]}`,
          properties: {},
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  }
}
