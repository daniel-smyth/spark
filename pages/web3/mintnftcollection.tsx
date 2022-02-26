import React, { useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { useWeb3 } from "@3rdweb/hooks";
import ThirdWebConnectButton from "../../components/utils/ThirdWebConnectButton";
import ButtonWithLoading from "../../components/utils/ButtonWithLoading";
import {
  Stack,
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Container,
} from "@chakra-ui/react";

function MintNftCollection() {
  // Currently connected blockchain provider.
  const { provider } = useWeb3();
  // Amount of NFTs to mint.
  const [amount, setAmount] = useState(0);

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
      process.env.PRIVATE_KEY as string,
      // RPC URL
      provider
    )
  );

  // Assign the drop module address.
  const nft_smart_contract_address =
    "0xb114629570497AE1dC5e651586670aba7483F467";

  // Instantiate NFT Drop Module.
  const drop = writeSdk.getDropModule(nft_smart_contract_address);

  // Run a for loop of a user inputted amount minting an NFT every time.
  const lazyMintNft = async () => {
    for (let i = 0; i < amount; i++) {
      try {
        await drop.createBatch([
          {
            name: `NFT ${i}.`,
            description: "To the moon.",
            image: "ipfs/<YOUR_IPFS_FOLDER_CID>/1.png",
            properties: {},
          },
        ]);
      } catch (err) {
        console.log(err);
      }

      console.log(drop.getAll());
    }
  };

  return (
    <Container>
      <Stack
        spacing={6}
        py={10}
        pb={20}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <ThirdWebConnectButton />
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={{ base: 6, md: 8 }}
        >
          <Stack spacing={4} minW={{ base: "70vw", md: "40vw" }}>
            <FormControl id="email" isRequired>
              <FormLabel>Amount of NFTs to mint.</FormLabel>
              <Input onChange={(e) => setAmount(Number(e.target.value))} />
            </FormControl>
            <Stack spacing={5} pt={2}>
              <ButtonWithLoading
                buttontext={"Mint NFTs"}
                onClick={lazyMintNft}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default MintNftCollection;
