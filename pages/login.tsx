import React from "react";
import { useRouter } from "next/router";
import { withRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import Connect from "../components/web3/util/Connect";

function LogIn(props: any) {
  const address = useAddress();
  const router = useRouter();

  if (address) {
    if (props.router.query.size) {
      router.push({
        pathname: "/create",
        query: { size: props.router.query.size },
      });
    } else router.push("/create");
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
          <Heading fontSize={{ base: "2xl", md: "3xl" }} alignSelf={"center"}>
            Connect to start
          </Heading>
        </Stack>
        <Connect />
      </Stack>
    </Container>
  );
}

export default withRouter(LogIn);