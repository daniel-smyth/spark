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
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, LinkIcon } from "@chakra-ui/icons";
import SparkBlack from "./iconcomponents/sparkblack";

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
  const [isTabletOrMobile] = useMediaQuery("(max-width: 1224px)");
  const [isBigScreen] = useMediaQuery("(min-width: 1224px)");
  const router = useRouter();

  const returnHome = () => {
    router.push("/");
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex
        h={"40px"}
        py={"25px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pl={{ base: 0, md: 4 }}
        pr={{ base: 0, md: 4 }}
      >
        {isTabletOrMobile ? (
          <Button
            variant="none"
            size="md"
            aria-label={"Open Menu"}
            onClick={isOpen ? onClose : onOpen}
          >
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </Button>
        ) : null}
        <HStack spacing={8} alignItems={"center"}>
          <Link>
            <SparkBlack
              onClick={returnHome}
              style={{ paddingBottom: "3px" }}
              width={60}
            />
          </Link>
          {isBigScreen ? (
            <HStack as={"nav"} spacing={4} display="flex">
              {Links.map((link) => NavLink(link[0], link[1]))}
            </HStack>
          ) : null}
        </HStack>
        <Flex alignItems={"center"}>
          {isBigScreen ? (
            <Button variant="solid" size="sm">
              Connect Wallet
            </Button>
          ) : null}
          {isTabletOrMobile ? (
            <Button variant="none" size="md">
              {isOpen ? <CloseIcon /> : <LinkIcon />}
            </Button>
          ) : null}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => NavLink(link[0], link[1]))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

const NavLink = (text: string, destination: string) => {
  return (
    <Link
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
