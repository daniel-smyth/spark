import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Stack, Spinner, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { fetchGetJSON } from '../../lib/stripe/utils/apiHelpers';
import Spark3Black from '../../components/Icon/spark3black';

// When a Stripe payment is complete, the stripe checkout session
// will redirect here. If the payment was successful
// (data?.payment_intent?.status does exist) the "status" message
// in local storage will be set to true

function Complete() {
  const [statusText, setStatusText] = useState('Processing');
  const router = useRouter();

  // SWR allows next to get data from a remote location
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  if (data?.payment_intent?.status && statusText === 'Processing') {
    // If payment was successful set status to "true"
    localStorage.setItem('status', 'true');

    setStatusText('Complete');
  }

  return (
    <Stack
      minH="50vh"
      spacing={7}
      py={10}
      alignItems="center"
      justifyContent="center"
    >
      {statusText === 'Processing' ? (
        <>
          <Spinner color="blue.500" />
          <Stack alignItems="center">
            <Text size="lg">{statusText}</Text>
          </Stack>
          <Spark3Black width={60} />
        </>
      ) : (
        <>
          <CheckIcon color="blue.500" />
          <Stack alignItems="center">
            <Text size="lg">{statusText}</Text>
            {statusText === 'Complete' ? (
              <Text size="lg">Return to minting page</Text>
            ) : null}
          </Stack>
          <Spark3Black width={60} />
        </>
      )}
    </Stack>
  );
}

export default Complete;
