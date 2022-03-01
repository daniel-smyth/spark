import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { readFileSync } from "fs";

export async function mintNftCollection(
  collectionSize: any,
  collectionDescription: any,
  imageNamePrefix: any
) {
  /**
   * ! WARNING
   * * Write blockchain (backend)
   * Initialises sdk with personal wallet’s private keys.
   * This method should be used with extreme care on the backend.
   * Do not 'push' with .ENV. Only for if you wish to mint the NFT.
   */
  const writeSdk = new ThirdwebSDK(
    new ethers.Wallet(
      // Your wallet private key
      process.env.PRIVATE_KEY!,
      // RPC URL
      ethers.getDefaultProvider()
    )
  );

  // Assign the drop module address.
  const nft_smart_contract_address =
    "0xb114629570497AE1dC5e651586670aba7483F467";

  // Instantiate NFT Drop Module.
  const drop = writeSdk.getDropModule(nft_smart_contract_address);

  console.log(await drop.getAll());

  // Run a for loop of a user inputted amount minting an NFT every time.
  const basePath = process.cwd();
  for (let i = 1; i <= collectionSize; i++) {
    try {
      await drop.createBatch([
        {
          name: `${imageNamePrefix}${i}.`,
          description: `${collectionDescription}`,
          image: readFileSync(
            `${basePath}/lib/artengine/outputtedartwork/images/${i}.png`
          ),
          properties: {},
        },
      ]);
    } catch (err) {
      console.log(err);
    }
    console.log(await drop.getAll());
  }
}
