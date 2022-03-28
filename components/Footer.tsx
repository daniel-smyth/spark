import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiMailSend } from "react-icons/bi";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Spark3Black from "./icon/spark3black";

/**
 * Renders a footer with logo, links, newsletter subscription.
 *
 * @returns footer component
 */
export default function Footer() {
  const router = useRouter();

  const returnHome = () => {
    router.push("/");
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Link>
                <Spark3Black
                  onClick={returnHome}
                  style={{ paddingBottom: "3px" }}
                  width={60}
                />
              </Link>
            </Box>
            <Text fontSize={"sm"}>© 2022 Spark3. All rights reserved</Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"Twitter"} href={"#"}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About us</Link>
            <Link href={"#"}>Contact us</Link>
            <Link href={"#"}>Pricing</Link>
            <Link href={"#"}>Testimonials</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Legal</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Satus</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                rounded={"lg"}
                variant={"solid"}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

/**
 * Renders social media icon below spark logo.
 *
 * @param props
 * @returns social media icons
 */
const SocialButton = (props: any) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={props.href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{props.label}</VisuallyHidden>
      {props.children}
    </chakra.button>
  );
};

/**
 * Renders head text in footer.
 *
 * @param props
 * @returns display head text
 */
const ListHeader = (props: any) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {props.text}
    </Text>
  );
};

ListHeader.propTypes = {
  text: PropTypes.string,
};

SocialButton.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};
