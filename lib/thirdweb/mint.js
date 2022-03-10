import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

export async function mint(size, description, namePrefix, allUrls, provider) {
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
  console.log(`Starting to mint ${size} images.`);
  const nfts = [];

  for (let i = 1; i <= size; i++) {
    nfts.push({
      name: `${namePrefix}${i}.`,
      description,
      image: allUrls[i],
      properties: {},
    });
  }

  try {
    await drop.createBatch(nfts);
  } catch (err) {
    console.log(err);
  }
}
