import React, { useEffect } from 'react';
import { Stack, Text, Spinner } from '@chakra-ui/react';
import getStripe from '../../lib/stripe/utils/getStripeJS';
import { fetchPostJSON } from '../../lib/stripe/utils/apiHelpers';
import Spark3Black from '../../components/Icon/spark3black';

// A redirect to this page will fetch a stripe checkout session using
// the "amount" variable found in local storage ("amount" is set via the
// Fees component prior to rendering this page).

// When payment is complete, stripe will redirect to the "result" page
// found in this directory

function Complete() {
  useEffect(() => {
    const stripeRedirect = async () => {
      // Fetch checkout session ID from Next.JS api for Stripe checkout_sessions
      const response = await fetchPostJSON('/api/checkout_sessions', {
        amount: Number(localStorage.getItem('amount'))
      });

      if (response.statusCode === 500) console.error(response.message);

      const stripe = await getStripe();

      // Open Stripe payment page
      const { error } = await stripe!.redirectToCheckout({
        sessionId: response.id
      });

      console.warn(error.message);
    };

    stripeRedirect();
  }, []);

  return (
    <Stack
      minH="50vh"
      spacing={7}
      py={10}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="blue.500" />

      <Stack alignItems="center">
        <Text size="lg">Redirecting</Text>
      </Stack>

      <Spark3Black width={60} />
    </Stack>
  );
}

export default Complete;
