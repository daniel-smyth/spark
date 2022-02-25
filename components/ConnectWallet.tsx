import React from "react";
import { AspectRatio, Button, Image, Stack, Text } from "@chakra-ui/react";
import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";

/**
 * Includes option to connect Metamask, WalletConnect and Coinbase
 * wallet. Also renders the connetion status of the user.
 *
 * @returns connect wallet component
 */
export default function ConnectWallet() {
  // Wallet variables.
  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
  const { canAttemptSwitch } = useSwitchNetwork();

  return (
    <Stack spacing={5}>
      {address && (
        <Button variant="outline" bg="white" onClick={disconnectWallet}>
          Disconnect
        </Button>
      )}
      <ConnectButton
        image={"https://thirdweb.com/logos/metamask-fox.svg"}
        connect={() => connectWallet("injected")}
        text="MetaMask"
      ></ConnectButton>
      <ConnectButton
        connect={() => connectWallet("walletconnect")}
        image={"https://thirdweb.com/logos/walletconnect-logo.svg"}
        text="Walletconnect"
      >
        WalletConnect
      </ConnectButton>
      <ConnectButton
        connect={() => connectWallet("walletlink")}
        image={"https://thirdweb.com/logos/coinbase-wallet-logo.svg"}
        text="Coinbase"
      >
        Coinbase Wallet
      </ConnectButton>
      <Stack>
        <Text>
          <strong>ChainID:</strong> {chainId || "N/A"}
        </Text>
        <Text>
          <strong>Can Switch:</strong> {`${!!canAttemptSwitch}`}
        </Text>
        <Text>
          <strong>Connected:</strong> {`${!!address}`}
        </Text>
        <Text>
          <strong>Wallet Address:</strong>{" "}
          {address ? `${address.slice(0, 16)}...` : "N/A"}
        </Text>
      </Stack>
    </Stack>
  );
}

/**
 * Renders a wallet connect button.
 *
 * @param props
 * @returns wallet connect button
 */
const ConnectButton = (props: any) => {
  return (
    <Button
      size="md"
      variant="outline"
      iconSpacing="auto"
      rightIcon={
        <AspectRatio ratio={1} w={6}>
          <Image src={props.image} />
        </AspectRatio>
      }
      onClick={props.connect}
    >
      {props.text}
    </Button>
  );
};
