import React from "react";
import Connect from "../../components/util/Connect";
import { useRouter } from "next/router";
import { withRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";

function GetStarted(props: any) {
  const address = useAddress();
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
          <Text alignSelf="center" variant="badge">
            Create NFT Art Collection
          </Text>
          <Heading fontSize={{ base: "2xl", md: "3xl" }} alignSelf={"center"}>
            Connect to start
          </Heading>
        </Stack>
        <Connect />
      </Stack>
    </Container>
  );
}

export default withRouter(GetStarted);
