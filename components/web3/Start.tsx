import { Stack, Button, Text } from "@chakra-ui/react";
import React from "react";
import Spark3Black from "../icon/spark3black";
import Summary from "./Summary";

interface Props {
  size: number;
  info: {
    name: string;
    description: string;
    prefix: string;
    mintTo: string;
  };
  startState: any;
}

export function Start(props: Props) {
  function handleClick() {
    props.startState(true);
  }

  return (
    <Stack spacing={5} alignItems="center" justifyContent={"center"}>
      <Spark3Black width={75} />
      <Stack alignItems="center">
        <Text size="md">You're ready.</Text>
        <Text size="md">A summary of your new NFT collection.</Text>
      </Stack>
      <Summary
        size={props.size}
        info={{
          name: props.info.name,
          description: props.info.description,
          prefix: props.info.prefix,
          mintTo: props.info.mintTo,
        }}
      />
      <Text size="sm">
        This can take a few hours, make sure your PC is plugged in.
      </Text>
      <Button variant={"solid"} size={"md"} onClick={handleClick}>
        mint NFTs
      </Button>
    </Stack>
  );
}
