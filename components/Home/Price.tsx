import React from 'react';
import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  price: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  buttonText: string;
  link: string;
  color: string;
  isDisabled: boolean;
}

function ProductPrice(props: Props) {
  const {
    title,
    price,
    feature1,
    feature2,
    feature3,
    feature4,
    buttonText,
    link,
    color,
    isDisabled
  } = props;
  const router = useRouter();

  function onClick() {
    router.push({
      pathname: link
    });
  }

  return (
    <Box
      w="full"
      maxW="330px"
      maxH="465px"
      rounded="xl"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="2xl"
    >
      <Stack
        p={6}
        align="center"
        color={useColorModeValue('gray.800', 'white')}
      >
        <Text variant="badge">{title}</Text>

        {Number(price) > 0 ? (
          <Stack direction="row" align="center" justify="center">
            <Text fontSize="2xl">$</Text>

            <Text color="black" fontSize="5xl" fontWeight={600}>
              {price || null}
            </Text>

            <Text color="gray.500">USD</Text>
          </Stack>
        ) : null}
      </Stack>

      <Box px={6} py={10} bg={useColorModeValue('gray.50', 'gray.900')}>
        <List spacing={3}>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${color}.500`} />
              {feature1}
            </Text>
          </ListItem>

          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${color}.500`} />
              {feature2}
            </Text>
          </ListItem>

          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${color}.500`} />
              {feature3}
            </Text>
          </ListItem>

          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${color}.500`} />
              {feature4}
            </Text>
          </ListItem>
        </List>

        <Button
          onClick={() => onClick()}
          size="md"
          w="full"
          mt={10}
          variant="solid"
          bg={color === 'grey' ? color : 'blue.500'}
          isDisabled={!!isDisabled}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default ProductPrice;
