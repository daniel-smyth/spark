import { useRouter } from "next/router";
import React, { useEffect } from "react";
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

interface Props {
  amount: number;
  paidState: any;
}

function Fees(props: Props) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => check(), 1000);
    return () => clearInterval(interval);
  }, []);

  let count = 0;
  function check() {
    if (localStorage.getItem("status") === "true") {
      props.paidState(true);
      localStorage.removeItem("status");
    } else {
      console.log("Not paid: " + count + " seconds.");
      count++;
    }
  }

  const handleClick = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("status", "false");
      localStorage.setItem("amount", `${props.amount}`);
      window.open("/stripe/start", "_blank")!.focus();
    }
  };

  const cancel = () => {
    router.push("/");
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
          <Text size="md">
            This fee does not cover ETH fees to create an NFT collection. ETH
            fees are paid with your wallet (Metamask) at the next step.
            <br />
            <br />
            Please have at least $200 ETH in your wallet.
          </Text>

          <Stack
            p={4}
            spacing={3}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Text size="sm">YOUR SUMMARY</Text>
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
                  <Text size="md">$99.00</Text>
                </GridItem>
              </Grid>
            </Box>
          </Stack>
        </Stack>
        <Stack>
          <Button onClick={handleClick} size="md" variant="solid">
            Proceed to payment
          </Button>
          <Link alignSelf={"center"} color={"blue.400"} onClick={cancel}>
            Cancel
          </Link>
        </Stack>
      </Stack>
    </>
  );
}

export default Fees;
