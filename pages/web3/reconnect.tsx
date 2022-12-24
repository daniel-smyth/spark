import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Text, Button } from '@chakra-ui/react';
import Spark3Black from '../../components/Icon/spark3black';

function ReconnectPage() {
  const router = useRouter();

  return (
    <Stack
      spacing={5}
      minH="50vh"
      alignItems="center"
      justifyContent="center"
      py={10}
    >
      <Spark3Black width={90} />
      <Stack alignItems="center">
        <Text size="lg">No wallet connected. Reconnect to continue.</Text>
      </Stack>
      <Button
        variant="solid"
        size="sm"
        onClick={() => router.push('/web3/connect')}
      >
        Reconnect
      </Button>
    </Stack>
  );
}

export default ReconnectPage;
