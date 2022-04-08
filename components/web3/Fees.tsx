import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Stack,
  Heading,
  Button,
  Grid,
  GridItem,
  Text,
  Box,
  Link,
  StackDivider,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import Spark3Black from "../icon/spark3black";
import { MdOutlineCollections } from "react-icons/md";
import Gas from "./util/Gas";
import { GasPrice, GasEstimatorMap } from "../../constants/mappings";
import { NFTCollection } from "@thirdweb-dev/sdk";

function Fees(props: {
  size: number;
  paidState: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { deployContract, mint }: GasPrice =
    GasEstimatorMap[NFTCollection.contractType];

  const fee = deployContract + mint! * props.size;
  const sparkFee = 200 - fee;

  useEffect(() => {
    const interval = setInterval(() => checkStatus(), 1000);
    return () => clearInterval(interval);
  }, []);

  function checkStatus() {
    if (localStorage.getItem("status") === "true") {
      props.paidState(true);
      localStorage.removeItem("status");
    }
  }

  const handleClick = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("status", "false");
      localStorage.setItem("amount", `${99}`);
      window.open("/stripe/start", "_blank")!.focus();
    }
  };

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
        <GridItem colSpan={3} h="8">
          <Heading size="md">Payment</Heading>
        </GridItem>
        <GridItem colStart={6} colEnd={8} h="8">
          <Spark3Black width={60} />
        </GridItem>
      </Grid>

      <Stack spacing={6}>
        <Stack>
          <Gas />
          <Stack
            p={4}
            spacing={3}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Text size="sm">YOUR FEES</Text>
            <Box pb={6}>
              <Grid
                minW="100%"
                templateColumns="repeat(5, 1fr)"
                alignItems={"center"}
                px={3}
                p={4}
                shadow="sm"
                bg="gray.100"
                rounded="xl"
              >
                <GridItem colSpan={6}>
                  <Stack spacing={4} direction={"row"} align={"center"}>
                    <Icon
                      as={MdOutlineCollections}
                      color={"blue.400"}
                      w={7}
                      h={7}
                    />
                    <Text fontWeight={700} size="sm">
                      NFT COLLECTION
                    </Text>
                  </Stack>
                </GridItem>
                <GridItem colStart={8} colEnd={12}>
                  <Text fontWeight={700} size="md">
                    $99.00
                  </Text>
                </GridItem>
              </Grid>
            </Box>
            <Box pr={4}>
              <Grid
                minW="100%"
                templateColumns="repeat(5, 1fr)"
                alignItems={"center"}
              >
                <GridItem colSpan={6}>
                  <Text size="sm">TOTAL</Text>
                </GridItem>
                <GridItem colStart={8} colEnd={12}>
                  <Text size="md">${fee}</Text>
                </GridItem>
              </Grid>
            </Box>
          </Stack>
        </Stack>
        <Stack>
          <Button onClick={handleClick} size="md" variant="solid">
            Proceed to payment
          </Button>
          <Link
            alignSelf={"center"}
            color={"blue.400"}
            onClick={() => router.push("/")}
          >
            Cancel
          </Link>
        </Stack>
      </Stack>
    </>
  );
}

export default Fees;
