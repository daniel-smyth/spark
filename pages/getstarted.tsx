import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";
import Connect from "../components/web3/Connect";

/**
 * Renders a product description component with pricing card an a collection
 * of pricing cards for new products.
 *
 * @returns product page
 */
function Page() {
  const { provider } = useWeb3();
  const router = useRouter();

  if (provider) router.push("/createcollection/create");

  return (
    <Container
      maxW="6xl"
      pt={{ base: 16, md: "80px" }}
      pb={{ base: 16, md: "80px" }}
    >
      <Stack spacing={4} px={{ base: 5 }}>
        <Stack
          spacing={{ base: 7, md: 5 }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <Text variant="badge">Create NFT Art Collection</Text>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Connect to start
          </Heading>
          <Stack alignItems={{ base: "none", md: "center" }} spacing={0.5}>
            <Text size="lg">Connect your wallet to get started.</Text>
            <Text size="lg">
              This will create an account with Spark automatically.
            </Text>
          </Stack>
        </Stack>
        <Connect />
      </Stack>
    </Container>
  );
}

export default Page;
