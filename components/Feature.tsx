import React, { ReactElement } from 'react';
import { Flex, Text, Stack } from '@chakra-ui/react';

interface FeatureProps {
  text: string;
  icon: ReactElement;
  iconBg: string;
}

function Feature(props: FeatureProps) {
  const { text, icon, iconBg } = props;

  return (
    <Stack direction="row" align="center">
      <Flex
        bg={iconBg}
        align="center"
        justify="center"
        rounded="full"
        w={8}
        h={8}
      >
        {icon}
      </Flex>

      <Text color="black" variant="bold">
        {text}
      </Text>
    </Stack>
  );
}

export default Feature;
