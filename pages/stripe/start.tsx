import getStripe from "../../lib/stripe/utils/get-stripejs";
import React, { useEffect } from "react";
import { fetchPostJSON } from "../../lib/stripe/utils/api-helpers";
import { Stack, Button, Text, Spinner } from "@chakra-ui/react";
import Spark3Black from "../../components/logo/spark3black";

function Complete() {
  useEffect(() => {
    const stripeRedirect = async () => {
      const response = await fetchPostJSON("/api/checkout_sessions", {
        amount: Number(localStorage.getItem("amount")),
      });
      if (response.statusCode === 500) console.error(response.message);
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: response.id,
      });
      console.warn(error.message);
    };
    stripeRedirect();
  }, []);

  return (
    <Stack
      minH={"50vh"}
      spacing={7}
      py={10}
      alignItems="center"
      justifyContent={"center"}
    >
      <Spinner color={"blue.500"} />
      <Stack alignItems="center">
        <Text size="lg">Redirecting</Text>
      </Stack>
      <Spark3Black width={60} />
    </Stack>
  );
}

export default Complete;
