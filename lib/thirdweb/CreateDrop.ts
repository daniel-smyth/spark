import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ICreateDrop } from "./ICreateDrop";

export async function createDrop(signer: JsonRpcSigner, options: ICreateDrop) {
  // Instantiate the SDK with a read only RPC url or a Signer to perform transaction.
  const sdk = new ThirdwebSDK(signer);

  // Drop module address.
  const address = await sdk.deployer.deployNFTDrop(options.dropOptions);

  // Access your deployed contracts.
  const drop = sdk.getNFTDrop(address);

  // Run a for loop of a user inputted amount minting an NFT every time.
  const nfts = [];

  console.log(`Starting to mint ${options.size} images.`);
  for (let i = 1; i <= options.size; i++) {
    nfts.push({
      name: `${options.prefix}${i}.`,
      description: options.description,
      image: options.imgSrcs[i],
      properties: {},
    });
  }

  // Mint.
  try {
    await drop.createBatch(nfts);
  } catch (err) {
    console.log(err);
  }
}
