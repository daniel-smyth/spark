import { ConnectWallet } from "@3rdweb/react";
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function ConnectWalletCard() {
  return (
    <Container p={8} maxW={"600px"}>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={6}>
          <Heading fontSize={{ base: "3xl", md: "2xl" }} alignSelf="center">
            Connect to begin
          </Heading>
          <Text size="md" alignSelf={"center"}>
            Please connect your wallet to mint your collection
          </Text>
          <ConnectWallet variant={"solid"} />
        </Stack>
      </Box>
    </Container>
  );
}

export default ConnectWalletCard;
