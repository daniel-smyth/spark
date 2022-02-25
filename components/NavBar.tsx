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
import SparkBlack from "./iconcomponents/sparkblack";
import useWindowDimensions from "../hooks/useWindowDimensions";

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
  // const [isTabletOrMobile] = useMediaQuery("(max-width: 1024px)");
  // const [isBigScreen] = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();

  const { isMobile } = useWindowDimensions();

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
        {isMobile ? (
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
          {!isMobile ? (
            <HStack as={"nav"} spacing={4} display="flex">
              {Links.map((link, i) => NavLink(i, link[0], link[1]))}
            </HStack>
          ) : null}
        </HStack>
        <Flex alignItems={"center"}>
          {isMobile ? (
            <Button variant="none" size="md">
              {isOpen ? <CloseIcon /> : <LinkIcon />}
            </Button>
          ) : (
            <Button variant="solid" size="sm">
              Connect Wallet
            </Button>
          )}
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
