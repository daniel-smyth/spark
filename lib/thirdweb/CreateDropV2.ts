import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ICreateDropV2 } from "./ICreateDropV2";

/**
 * Creates a drop module using the address of the current provider wallet. This means
 * the user pays for the transaction costs of minting a colleciton. Mints the collection
 * to an address provided by the user.
 *
 * @param options drop options
 */
export async function createDropV2(options: ICreateDropV2) {
  // Instantiate the SDK with a read only RPC url or a Signer to perform transaction.
  const sdk = new ThirdwebSDK(options.signer);

  // Drop module address.
  const address = await sdk.deployer.deployNFTCollection(options.dropOptions);

  // Access your deployed contracts.
  const drop = sdk.getNFTCollection(address);

  // Create NFT metadata array and mint as batch to OpenSea address.
  console.time("Minting time");
  console.log(
    `Minting ${options.size} images. This can take a couple of mintues...`
  );
  const nfts = [];
  for (let i = 1; i <= options.size; i++) {
    nfts.push({
      description: options.description,
      image: options.imgSrcs[i],
      external_url: options.imgSrcs[i],
      name: `${options.prefix}${i}.`,
    });
  }

  // Mint.
  try {
    console.log(await drop.mintBatchTo(options.toAddress, nfts));
  } catch (err) {
    console.log(err);
  }

  console.timeEnd("Minting time");
}
