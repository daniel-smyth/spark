import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Text, Button } from '@chakra-ui/react';
import Spark3Black from '../../components/Icon/spark3black';

function Reject() {
  const router = useRouter();

  function handleClick() {
    router.push('/web3/connect');
  }

  return (
    <Stack
      minH="50vh"
      spacing={5}
      py={10}
      alignItems="center"
      justifyContent="center"
    >
      <Spark3Black width={90} />
      <Stack alignItems="center">
        <Text size="lg">No wallet connected. Reconnect to continue.</Text>
      </Stack>
      <Button variant="solid" size="sm" onClick={() => handleClick()}>
        Reconnect
      </Button>
    </Stack>
  );
}

export default Reject;