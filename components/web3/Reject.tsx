import { Stack, Spinner, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Spark3Black from "../logo/spark3black";

function Reject() {
  const router = useRouter();

  function handleClick() {
    router.push("/create/collection");
  }

  return (
    <Stack
      minH={"50vh"}
      spacing={5}
      py={10}
      alignItems="center"
      justifyContent={"center"}
    >
      <Spark3Black width={90} />
      <Stack alignItems="center">
        <Text size="lg">No wallet connected. Reconnect to continue.</Text>
      </Stack>
      <Button variant={"solid"} size={"sm"} onClick={handleClick}>
        Reconnect
      </Button>
    </Stack>
  );
}

export default Reject;
