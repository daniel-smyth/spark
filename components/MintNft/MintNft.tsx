import React, { useState } from "react";
// Thirdweb
import { NFTMetadata, ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { Button, Input, Text } from "@chakra-ui/react";
import styles from "./MintNft.module.css";
import { divide } from "lodash";

/**
 * * MINT ON COMPILE 1 OFF NFT WITH DATA
 */

// RPC - Remote Procedure Call URL.
const rpc = "https://rinkeby-light.eth.linkpool.io/";
// PROVIDER - The service to allow you to "write" to the blockchain .
const provider = ethers.getDefaultProvider(rpc);

/**
 * * READ BLOCKCHAIN (FRONTEND)
 * Doesn't pass private keys. Can use the below to read data on the
 * blockchain. E.g. get all the listings on your marketplace.
 * Regardless of whether user is connected, listings and images
 * will still show.
 */
const readSdk = new ThirdwebSDK(provider);

/**
 * ! WARNING
 * * WRITE BLOCKCHAIN (BACKEND)
 * Initialise the sdk is to make use of your own wallet’s private keys.
 * This method should be used with extreme care on the backend, making
 * sure not to expose your private keys. Rare as usually the wallet
 * that is connected will initiate the SDK.
 */
const writeSdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key
    process.env.PRIVATE_KEY as string,
    // RPC URL
    provider
  )
);

// assign the smart contract address
const nft_smart_contract_address = "0x896761d25f6F295e21E519AEF6A5839850935DF8";

// Instantiate NFT Collection module
const nft = writeSdk.getNFTModule(nft_smart_contract_address);

// Minting the NFT asynchronously
async function mint(nftName: string, nftMessage: string) {
  return await nft.mint({
    name: nftName,
    message: nftMessage,
    properties: {},
  });
}

/**
 * * MINTS 1 OFF NFT WITH DATA
 * TODO: Explore options of storing data on the blockchain with this function.
 * Mints an NFT with data from text input.
 */
function Minter() {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [nftName, setNftName] = useState("");
  const [nftMessage, setNftMessage] = useState("");

  // Minting function.
  async function beginMint() {
    console.log("NFT variables:", nftName, nftMessage);
    console.log("Minting...");
    setMinting(true);
    const mintedNft = mint(nftName, nftMessage);
    if (await mintedNft) {
      console.log("Minted!");
      console.log(mintedNft);
      setMinting(false);
      setMinted(true);
    }
  }

  return (
    <div className={styles.aligncenter}>
      <Text fontWeight={"bold"}>Input name of NFT</Text>
      <Input
        mt="2%"
        placeholder="This will be on the blockchain"
        onChange={(e) => setNftName(e.target.value)} // Set NFT name while typing.
      ></Input>
      <Text fontWeight={"bold"}>Make your mark in history</Text>
      <Input
        mt="2%"
        placeholder="Write a message on the blockchain"
        onChange={(e) => setNftMessage(e.target.value)} // Set NFT message while typing.
      ></Input>
      {minted ? (
        <Text align="center" padding={"10%"} fontWeight={"bold"} fontSize={20}>
          NFT minted. Want to mint another?
        </Text>
      ) : (
        <div></div>
      )}
      {!minting ? (
        <div className={styles.centerbutton}>
          <Button
            onClick={() => {
              beginMint(); // Start the mint on button click.
            }}
          >
            Mint an NFT
          </Button>
        </div>
      ) : (
        <Text align="center" padding={"10%"} fontWeight={"bold"} fontSize={20}>
          We're minting under the hood... Check the console.
        </Text>
      )}
    </div>
  );
}

export default Minter;
