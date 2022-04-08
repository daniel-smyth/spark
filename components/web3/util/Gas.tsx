import { Badge, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { NFTCollection } from "@thirdweb-dev/sdk";
import { useState } from "react";
import { useGas } from "../../../hooks/useGas";
import { GasEstimatorBox } from "./GasEstimatorBox";

const GasPage = () => {
  const [ethOrUsd, setEthOrUsd] = useState<"eth" | "usd">("eth");
  const { data } = useGas();

  return (
    <>
      <Flex mb={4}>
        <Flex justifyContent="center" alignItems="center">
          <Badge
            size="lg"
            colorScheme="green"
            borderRadius="lg"
            px={1}
            py={0.5}
            mr={3}
          >
            Ethereum
          </Badge>
          <Heading size="subtitle.sm">ETH</Heading>
          <Switch
            mx={1.5}
            onChange={() => {
              setEthOrUsd(ethOrUsd === "eth" ? "usd" : "eth");
            }}
          />
          <Heading size="subtitle.sm">USD</Heading>
        </Flex>
      </Flex>
      <GasEstimatorBox
        contractType={NFTCollection.contractType}
        ethOrUsd={ethOrUsd}
        data={data}
      />
      <Text mt={4} textAlign="center">
        Estimates calculated at {data?.gasPrice} gwei and the ETH price of $
        {data?.ethPrice}. Updated every 10 seconds.
      </Text>
    </>
  );
};

export default GasPage;
