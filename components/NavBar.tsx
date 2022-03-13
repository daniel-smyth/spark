import { useRouter } from "next/router";
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, LinkIcon } from "@chakra-ui/icons";
import Spark3Black from "./logo/spark3black";
import { ConnectWallet } from "@3rdweb/react";

const Links = [
  ["Create NFT", "#"],
  ["About Us", "#"],
  ["Team", "#"],
];

/**
 * Renders navbar with logo, link, connect wallet.
 *
 * @returns navbar component
 */
export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const returnHome = () => {
    router.push("/");
  };

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      position="sticky"
      top={0}
      width={"100%"}
      zIndex={200}
    >
      <Flex
        h={"40px"}
        py={"25px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pl={{ base: 0, md: 4 }}
        pr={{ base: 0, md: 4 }}
      >
        <Button
          display={{ base: "flex", md: "none" }}
          variant="none"
          size="md"
          aria-label={"Open Menu"}
          onClick={isOpen ? onClose : onOpen}
        >
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Button>
        <HStack spacing={8} alignItems={"center"}>
          <Link>
            <Spark3Black
              onClick={returnHome}
              style={{ paddingLeft: "3px" }}
              width={75}
            />
          </Link>
          <HStack as={"nav"} spacing={4} display={{ md: "flex", base: "none" }}>
            {Links.map((link, i) => NavLink(i, link[0], link[1]))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button
            variant="none"
            size="md"
            display={{ base: "flex", md: "none" }}
          >
            {isOpen ? <CloseIcon /> : <LinkIcon />}
          </Button>
          <ConnectWallet
            display={{ base: "none", md: "flex" }}
            variant={"solid"}
            height={"39px"}
            fontSize={"12px"}
            padding={"16px"}
            rounded={"2xl"}
          />
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link, i) => NavLink(i, link[0], link[1]))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

const NavLink = (key: number, text: string, destination: string) => {
  return (
    <Link
      key={key}
      fontSize={"sm"}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={destination}
    >
      {text}
    </Link>
  );
};
