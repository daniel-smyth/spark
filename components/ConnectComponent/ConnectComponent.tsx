import React from "react";
// Chakra UI
import { AspectRatio, Button, Image, Text } from "@chakra-ui/react";
// Thirdweb
import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import styles from "./ConnectComponent.module.css";

/**
 * * FULL CONNECT WALLET UI
 * Includes Metmask, WalletConnect and Coinbase wallet. Also renders the
 * current connetion status of the user.
 */

export default function ConnectComponent() {
  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
  const { canAttemptSwitch } = useSwitchNetwork();

  return (
    <div className={styles.aligncenter}>
      {address && (
        <Button
          onClick={disconnectWallet}
          mt="8px"
          variant="outline"
          bg="white"
        >
          Disconnect
        </Button>
      )}

      <Text
        ml="10%"
        mb="5%"
        fontWeight="bold"
        fontSize="24px"
        alignSelf="center"
      >
        Connect Wallet
      </Text>

      <Button
        mb="8px"
        size="lg"
        variant="outline"
        bg="white"
        isFullWidth
        iconSpacing="auto"
        rightIcon={
          <AspectRatio ratio={1} w={6}>
            <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
          </AspectRatio>
        }
        onClick={() => connectWallet("injected")}
      >
        MetaMask
      </Button>

      <Button
        mb="8px"
        size="lg"
        variant="outline"
        isFullWidth
        iconSpacing="auto"
        rightIcon={
          <AspectRatio ratio={1} w={6}>
            <Image src="https://thirdweb.com/logos/walletconnect-logo.svg" />
          </AspectRatio>
        }
        onClick={() => connectWallet("walletconnect")}
      >
        WalletConnect
      </Button>

      <Button
        size="lg"
        variant="outline"
        isFullWidth
        iconSpacing="auto"
        rightIcon={
          <AspectRatio ratio={1} w={6}>
            <Image src="https://thirdweb.com/logos/coinbase-wallet-logo.svg" />
          </AspectRatio>
        }
        onClick={() => connectWallet("walletlink")}
      >
        Coinbase Wallet
      </Button>
      <div className={styles.aligncenter}>
        <Text fontWeight="bold" fontSize="24px" alignSelf="center">
          Current Status
        </Text>
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
      </div>
    </div>
  );
}
