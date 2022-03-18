import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import Connect from "../../components/web3/Connect";
import { withRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";

/**
 * Renders a product description component with pricing card an a collection
 * of pricing cards for new products.
 *
 * @returns product page
 */
function Page(props: any) {
  const address = useAddress()
  const router = useRouter();

  if (address) {
    if (props.router.query.size) {
      router.push({
        pathname: "/create/collection",
        query: { size: props.router.query.size },
      });
    } else router.push("/create/collection");
  }

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

export default withRouter(Page);
