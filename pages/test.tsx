import { Button, Heading, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import FormContainer from "../components/form/FormContainer";
import { fetchPostJSON } from "../lib/stripe/utils/apihelpers";
import getStripe from "../lib/stripe/utils/getstripe";

const ResultPage: NextPage = () => {
  const handleClick = async () => {
    const response = await fetchPostJSON("/api/checkout_sessions", {
      amount: 199,
    });

    if (response.statusCode === 500) console.error(response.message);

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
        <Button size="md" variant="solid" onClick={handleClick}>
          Create collection
        </Button>
      </Stack>
    </FormContainer>
  );
};

export default ResultPage;
