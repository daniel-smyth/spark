import { Button, Heading, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import FormContainer from "../components/form/FormContainer";
import FormNumberInput from "../components/form/FormNumberInput";
import { fetchPostJSON } from "../lib/stripe/utils/apihelpers";
import getStripe from "../lib/stripe/utils/getstripe";

function Test() {
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handleClick = async () => {
    // Create a Checkout Session.
    const response = await fetchPostJSON("/api/checkout_sessions", {
      amount: paymentAmount,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  };

  return (
    <FormContainer>
      <Stack spacing={4}>
        <Heading>Payment</Heading>
        <FormNumberInput
          name={""}
          maxSize={1000}
          label={"Payment amount"}
          defaultValue={0}
          onChange={setPaymentAmount}
        />
        <Button size="md" variant="solid" onClick={handleClick}>
          Create collection
        </Button>
      </Stack>
    </FormContainer>
  );
}

export default Test;
