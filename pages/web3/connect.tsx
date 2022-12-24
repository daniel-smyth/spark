import React, { useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { isTablet, isMobile } from 'react-device-detect';
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
  ButtonProps,
  Flex,
  Heading,
  Image,
  Link,
  LinkProps,
  Stack,
  Text
} from '@chakra-ui/react';

const METAMASK_URL = 'https://metamask.app.link/dapp/spark3.io/';
const WALLETCONNECT_URL = 'https://docs.walletconnect.com/mobile-linking';

function TextLink(props: LinkProps) {
  const { href, children } = props;
  return (
    <>
      {' '}
      <Link color="blue.400" href={href}>
        {' '}
        {children}
      </Link>{' '}
    </>
  );
}

interface ConnectButtonProps extends ButtonProps {
  imageSrc: string;
}

function ConnectButton(props: ConnectButtonProps) {
  const { imageSrc, children, variant } = props;
  return (
    <Button
      as="button"
      variant={variant || 'solid'}
      width="100%"
      iconSpacing="auto"
      rightIcon={
        <AspectRatio ratio={1} w={6}>
          <Image src={imageSrc} />
        </AspectRatio>
      }
      {...props}
    >
      {children}
    </Button>
  );
}

function DesktopWalletOptions() {
  const connectWithCoinBase = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();

  return (
    <>
      <ConnectButton
        imageSrc="https://thirdweb.com/logos/metamask-fox.svg"
        onClick={() => connectWithMetamask()}
      >
        MetaMask
      </ConnectButton>
      <ConnectButton
        imageSrc="https://thirdweb.com/logos/coinbase-wallet-logo.svg"
        onClick={() => connectWithCoinBase()}
      >
        Coinbase Wallet
      </ConnectButton>
      <ConnectButton
        imageSrc="https://thirdweb.com/logos/walletconnect-logo.svg"
        onClick={() => connectWithWalletConnect()}
      >
        WalletConnect
      </ConnectButton>
    </>
  );
}

function ConnectPage() {
  const [ethBrowser, setEthBrowser] = useState(true);
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();
  const router = useRouter();

  useEffect(() => {
    const checkEth = () =>
      typeof window.ethereum === 'undefined' && setEthBrowser(false);

    const interval = setInterval(checkEth, 100);

    return () => clearInterval(interval);
  }, []);

  if (address) {
    if (router.query.size) {
      router.push({
        pathname: '/web3/create-collection',
        query: { size: router.query.size }
      });
    } else {
      router.push('/web3/create-collection');
    }
  }

  return (
    <Stack spacing={6} alignItems="center" pt={20}>
      <Heading fontSize="3xl">Connect to start</Heading>
      <Flex bg="gray.50" borderRadius="16px" maxW="400px" padding="20px">
        <Box>
          {address && <Text>Loading...</Text>}
          {!address && (
            <>
              {ethBrowser && (
                <Stack spacing={3}>
                  {isTablet || isMobile ? (
                    <ConnectButton
                      imageSrc="https://thirdweb.com/logos/walletconnect-logo.svg"
                      onClick={() => connectWithWalletConnect()}
                    >
                      WalletConnect
                    </ConnectButton>
                  ) : (
                    <DesktopWalletOptions />
                  )}
                  <Text align="center" size="md">
                    No wallet?
                    <TextLink href={METAMASK_URL}>Create wallet</TextLink>
                  </Text>
                </Stack>
              )}

              {!ethBrowser &&
                (isTablet || isMobile ? (
                  <>
                    <Text size="md" py={4}>
                      You&apos;re on mobile{' '}
                    </Text>
                    <Text size="md" pb={1}>
                      Metamask has an
                      <TextLink href={METAMASK_URL}>app</TextLink>
                      you can use with
                      <TextLink href={WALLETCONNECT_URL}>
                        WalletConnect
                      </TextLink>
                      or use a desktop for Metamask Chrome or Coinbase wallets.
                    </Text>
                    <Box pt={5}>
                      <AspectRatio ratio={1} w={5} h={5}>
                        <Image src="https://thirdweb.com/logos/metamask-fox.svg" />
                      </AspectRatio>
                    </Box>
                  </>
                ) : (
                  <>
                    <ConnectButton
                      imageSrc="https://thirdweb.com/logos/walletconnect-logo.svg"
                      onClick={() => connectWithWalletConnect()}
                    >
                      WalletConnect
                    </ConnectButton>
                    <ConnectButton
                      imageSrc="https://thirdweb.com/logos/metamask-fox.svg"
                      onClick={() =>
                        window.open(METAMASK_URL, '_blank')!.focus()
                      }
                    >
                      Create Wallet
                    </ConnectButton>
                  </>
                ))}
            </>
          )}
        </Box>
      </Flex>
    </Stack>
  );
}

export default withRouter(ConnectPage);
