import React, { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, LinkIcon } from '@chakra-ui/icons';
import Spark3Black from './Icon/spark3black';

const Links = [
  ['Create Collection', '/web3/connect'],
  ['About Us', '#']
];

function NavLink(key: number, text: string, destination: string) {
  return (
    <Link
      href={destination}
      fontSize="sm"
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: 'gray.200'
      }}
      px={2}
      py={1}
      key={key}
    >
      {text}
    </Link>
  );
}

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const onClick = () => {
    router.push('/');
  };

  return (
    <Box position="sticky" top={0} width="100%" zIndex={200} bg="gray.100">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        h="40px"
        py="25px"
        pl={{ base: 0, md: 4 }}
        pr={{ base: 0, md: 4 }}
      >
        <Button
          display={{ base: 'flex', md: 'none' }}
          size="md"
          variant="none"
          onClick={isOpen ? onClose : onOpen}
        >
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Button>

        <HStack spacing={8} alignItems="center">
          <Spark3Black
            cursor="pointer"
            style={{ paddingLeft: '3px' }}
            width={75}
            onClick={onClick}
          />

          <HStack as="nav" spacing={4} display={{ md: 'flex', base: 'none' }}>
            {Links.map((link, i) => NavLink(i, link[0], link[1]))}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <Button
            variant="none"
            size="md"
            display={{ base: 'flex', md: 'none' }}
          >
            {isOpen ? <CloseIcon /> : <LinkIcon />}
          </Button>
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link, i) => NavLink(i, link[0], link[1]))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
