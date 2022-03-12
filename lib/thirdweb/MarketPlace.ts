import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export async function loadMarketplace(
  provider: any,
  nftContractAddress: string
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
      process.env.PRIVATE_KEY!,
      // RPC URL
      provider
    )
  );

  // Initialize market module by passing in the module address
  const marketModuleAddress = "0xC06adC34097afa2085324D4192fbE9206059f8e0";
  const market = writeSdk.getMarketplace(marketModuleAddress);

  // Declaring the NFT Collection module address
  const nftCollectionModuleAddress =
    "0xdd25FAEE772FbB1bcB7ba0b2cEE6387A8F82f032";

  // the listingId of the listing you want to fetch data for
  const tokenId = "1";
  const tokenIdOffer = 1;

  market.createDirectListing({
    assetContractAddress: nftCollectionModuleAddress,
    buyoutPricePerToken: ethers.utils.parseUnits(tokenIdOffer, 18),
    currencyContractAddress: tokenModuleAddress,
    startTimeInSeconds: Math.floor(Date.now() / 1000),
    listingDurationInSeconds: 60 * 60 * 24,
    tokenId: tokenId,
    quantity: 1,
  });

  // Get all the listings
  market.getAllListings();
}
