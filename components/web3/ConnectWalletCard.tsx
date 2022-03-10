import { ConnectWallet } from "@3rdweb/react";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface ConnectWalletCardProps {
  header: string;
  body: string;
}

function ConnectWalletCard(props: ConnectWalletCardProps) {
  return (
    <Container p={{ base: 0, md: 8 }} maxW={"600px"}>
      <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
        <Stack spacing={6}>
          <Heading fontSize={{ base: "3xl", md: "2xl" }} alignSelf="center">
            {props.header}
          </Heading>
          <Text size="md" alignSelf={"center"}>
            {props.body}
          </Text>
          <ConnectWallet variant={"solid"} />
        </Stack>
      </Box>
    </Container>
  );
}

export default ConnectWalletCard;
