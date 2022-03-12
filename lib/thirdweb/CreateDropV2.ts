import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ICreateDropV2 } from "./ICreateDropV2";

/**
 * Creates a drop module using the address of the current provider wallet. This means
 * the user pays for the transaction costs of minting a colleciton. Once the collection
 * is completed meeting it will need to be given to the user. I am thinking this can be
 * done by sending all NFT's as a batch the user's OpenSea (or similar) address. Once
 * this has been released on ETH mainnet this service is essentially read to launch.
 *
 * @param options drop options
 */
export async function createDropV2(options: ICreateDropV2) {
  // Instantiate the SDK with a read only RPC url or a Signer to perform transaction.
  const sdk = new ThirdwebSDK(options.signer);

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

  // Claim to recipient address.
  drop.claimTo(options.toAddress, await drop.totalSupply());
}
