import React from "react";
import {
  Button,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { buildSetup, startCreating } from "../lib/artengine/main";

function CreateTenThousand(props: any) {
  return (
    <Container>
      <Stack
        spacing={6}
        py={10}
        pb={20}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack align={"center"}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} textAlign={"center"}>
            Create NFT Collection
          </Heading>
        </Stack>
      </Stack>
    </Container>
  );
}

export default CreateTenThousand;

export async function getServerSideProps(context: any) {
  const buildArtEngine = buildSetup;
  const startArtEngine = startCreating;

  // console.log(buildArtEngine());
  // console.log(startArtEngine(10));

  return {
    props: {},
  };
}
