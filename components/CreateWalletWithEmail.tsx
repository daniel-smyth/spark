import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";
import {
  InstanceWithExtensions,
  MagicSDKExtensionsOption,
  SDKBase,
} from "@magic-sdk/provider";

function CreateWalletWithEmail() {
  const [magic, setMagic] =
    useState<
      InstanceWithExtensions<SDKBase, MagicSDKExtensionsOption<string>>
    >();
  const [thirdWeb, setThirdWeb] = useState<ThirdwebSDK>();

  useEffect(() => {
    // Configure Ethereum provider.
    const magic = new Magic("pk_live_CEFF9DD7CA9E67CB", {
      network: "rinkeby",
    });
    const provider = new ethers.providers.Web3Provider(
      magic.rpcProvider as any
    );
    // Initialise third web.
    const signer = provider.getSigner();
    const sdk = new ThirdwebSDK(signer);

    // Set states.
    setMagic(magic);
    setThirdWeb(sdk);
  });

  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Button>Init magic</Button>
      </Flex>
    </div>
  );
}

export default CreateWalletWithEmail;
function setState(): [any, any] {
  throw new Error("Function not implemented.");
}
