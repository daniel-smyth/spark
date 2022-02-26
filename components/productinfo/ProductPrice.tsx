import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import ButtonWithLoading from "../utils/ButtonWithLoading";

/**
 * Renders pricing card component with royalty percentage,
 * description and button to purchase.
 *
 * @param props
 * @returns pricing card component
 */
function ProductPrice(props: any) {
  const router = useRouter();

  return (
    <Box
      maxW={"330px"}
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
            <Text fontSize={"2xl"}>%</Text>
            <Text color="black" fontSize={"6xl"} fontWeight={800}>
              {props.royalty}
            </Text>
            <Text color={"gray.500"}>royalty</Text>
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

        <ButtonWithLoading
          mt={10}
          bg={props.color == "grey" ? props.color : null}
          w={"full"}
          size={"md"}
          variant={"solid"}
          buttontext={"Create collection"}
          loadingText={""}
          linkDestination={props.link}
        />
      </Box>
    </Box>
  );
}

ProductPrice.propTypes = {
  color: PropTypes.string,
  displayRoyalty: false,
  packageName: PropTypes.string,
  link: PropTypes.string,
  royalty: PropTypes.string,
  feature1: PropTypes.string,
  feature2: PropTypes.string,
  feature3: PropTypes.string,
  feature4: PropTypes.string,
  buttonText: PropTypes.string,
};

export default ProductPrice;
