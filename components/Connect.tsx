import React, { useEffect, useState } from 'react';
import {
  useAddress,
  useCoinbaseWallet,
  useMetamask,
  useWalletConnect
} from '@thirdweb-dev/react';
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Text
} from '@chakra-ui/react';
import { isMobile, isTablet } from 'react-device-detect';

export default function Connect() {
  const [eth, setEth] = useState(true);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithCoinBase = useCoinbaseWallet();
  const connectWithWalletConnect = useWalletConnect();

  function check() {
    if (typeof window.ethereum === 'undefined') setEth(false);
  }

  useEffect(() => {
    const interval = setInterval(() => check(), 100);
    return () => clearInterval(interval);
  }, []);

  function metamaskInfo() {
    window.open('https://metamask.app.link/dapp/spark3.io/', '_blank')!.focus();
  }

  function walletconnectInfo() {
    window
      .open('https://docs.walletconnect.com/mobile-linking', '_blank')!
      .focus();
  }

  return (
    <Box align="center">
      <Flex
        width={{ base: 'none', md: '400px' }}
        bg="gray.50"
        borderRadius="16px"
        direction="column"
        padding={{ base: 'none', md: '20px' }}
        py={6}
      >
        <Box p={2}>
          {address ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {!eth ? (
                isTablet || isMobile ? (
                  <Button
                    variant="solid"
                    width="100%"
                    iconSpacing="auto"
                    rightIcon={
                      <AspectRatio ratio={1} w={6}>
                        <Image src="https://thirdweb.com/logos/walletconnect-logo.svg" />
                      </AspectRatio>
                    }
                    onClick={() => connectWithWalletConnect()}
                  >
                    WalletConnect
                  </Button>
                ) : (
                  <Button
                    mb="8px"
                    variant={eth ? 'solid' : 'outline'}
                    width="100%"
                    iconSpacing="auto"
                    rightIcon={
                      <AspectRatio ratio={1} w={6}>
                        <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
                      </AspectRatio>
                    }
                    onClick={metamaskInfo}
                  >
                    Create Wallet
                  </Button>
                )
              ) : isTablet || isMobile ? (
                <Button
                  variant="solid"
                  width="100%"
                  iconSpacing="auto"
                  rightIcon={
                    <AspectRatio ratio={1} w={6}>
                      <Image src="https://thirdweb.com/logos/walletconnect-logo.svg" />
                    </AspectRatio>
                  }
                  onClick={() => connectWithWalletConnect()}
                >
                  WalletConnect
                </Button>
              ) : (
                <>
                  <Button
                    mb="8px"
                    variant={eth ? 'solid' : 'outline'}
                    width="100%"
                    iconSpacing="auto"
                    rightIcon={
                      <AspectRatio ratio={1} w={6}>
                        <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
                      </AspectRatio>
                    }
                    onClick={() => connectWithMetamask()}
                  >
                    MetaMask
                  </Button>
                  <Button
                    mb="8px"
                    width="100%"
                    variant={eth ? 'solid' : 'outline'}
                    iconSpacing="auto"
                    rightIcon={
                      <AspectRatio ratio={1} w={6}>
                        <Image src="https://thirdweb.com/logos/coinbase-wallet-logo.svg" />
                      </AspectRatio>
                    }
                    onClick={() => connectWithCoinBase()}
                  >
                    Coinbase Wallet
                  </Button>
                  <Button
                    variant="solid"
                    width="100%"
                    iconSpacing="auto"
                    rightIcon={
                      <AspectRatio ratio={1} w={6}>
                        <Image src="https://thirdweb.com/logos/walletconnect-logo.svg" />
                      </AspectRatio>
                    }
                    onClick={() => connectWithWalletConnect()}
                  >
                    WalletConnect
                  </Button>
                </>
              )}

              {isMobile || isTablet ? (
                <>
                  <Text pt={4} py={4} size={'md'}>
                    You're on mobile{' '}
                  </Text>
                  <Text pb={1} size={'md'}>
                    Metamask has an
                    <Link color={'blue.400'} onClick={metamaskInfo}>
                      {' '}
                      app
                    </Link>{' '}
                    you can use with{' '}
                    <Link color={'blue.400'} onClick={walletconnectInfo}>
                      {' '}
                      WalletConnect
                    </Link>{' '}
                    or use a desktop for Metamask Chrome or Coinbase wallets.
                  </Text>
                  <Box pt={5}>
                    <AspectRatio ratio={1} w={5} h={5}>
                      <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
                    </AspectRatio>
                  </Box>
                </>
              ) : (
                <Text pt={4} align={'center'} size={'md'}>
                  No wallet?{' '}
                  <Link color={'blue.400'} onClick={metamaskInfo}>
                    Create wallet
                  </Link>
                </Text>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
