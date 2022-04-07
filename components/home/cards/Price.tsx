import React from "react";
import {
  Box,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

/**
 * Renders pricing card component with royalty percentage,
 * description and button to purchase.
 *
 * @param props
 * @returns pricing card component
 */
function ProductPrice(props: any) {
  return (
    <Box
      maxW={"330px"}
      maxH={"465px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"xl"}
      overflow={"hidden"}
    >
      <Stack
        p={6}
        color={useColorModeValue("gray.800", "white")}
        align={"center"}
      >
        <Text variant="badge">{props.packageName}</Text>
        {props.displayRoyalty ? (
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"2xl"}>$</Text>
            <Text color="black" fontSize={"5xl"} fontWeight={600}>
              {props.royalty ? props.royalty : null}
            </Text>
            <Text color={"gray.500"}>USD</Text>
          </Stack>
        ) : null}
      </Stack>
      <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
        <List spacing={3}>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${props.color}.500`} />
              {props.feature1}
            </Text>
          </ListItem>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${props.color}.500`} />
              {props.feature2}
            </Text>
          </ListItem>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${props.color}.500`} />
              {props.feature3}
            </Text>
          </ListItem>
          <ListItem>
            <Text size="sm">
              <ListIcon as={CheckIcon} color={`${props.color}.500`} />
              {props.feature4}
            </Text>
          </ListItem>
        </List>

        <Button
          mt={10}
          bg={props.color == "grey" ? props.color : null}
          w={"full"}
          size={"md"}
          variant={"solid"}
          isDisabled={props.isDisabled ? true : false}
        >
          {props.buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default ProductPrice;
