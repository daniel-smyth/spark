import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface PricingCardProps {
  color: string;
  displayRoyalty: boolean;
  packageName: string;
  link: string;
  royalty: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  buttonText: string;
}

export default function PricingCard(props: PricingCardProps) {
  const {
    color,
    displayRoyalty,
    packageName,
    link,
    royalty,
    feature1,
    feature2,
    feature3,
    feature4,
    buttonText,
  } = props;

  function getColor(value: string) {
    return `${color}.${value}`;
  }

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
        textAlign={"center"}
        p={6}
        color={useColorModeValue("gray.800", "white")}
        align={"center"}
      >
        <Text
          fontSize={"sm"}
          fontWeight={500}
          bg={
            color == "grey"
              ? useColorModeValue("grey", getColor("900"))
              : useColorModeValue(getColor("50"), getColor("900"))
          }
          p={2}
          px={3}
          color={color == "grey" ? "white" : getColor("500")}
          rounded={"full"}
        >
          {packageName}
        </Text>
        {displayRoyalty ? (
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"2xl"}>%</Text>
            <Text fontSize={"6xl"} fontWeight={800}>
              {royalty}
            </Text>
            <Text color={"gray.500"}>royalty</Text>
          </Stack>
        ) : null}
      </Stack>

      <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckIcon} color={getColor("400")} />
            {feature1}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color={getColor("400")} />
            {feature2}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color={getColor("400")} />
            {feature3}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color={getColor("400")} />
            {feature4}
          </ListItem>
        </List>

        <Link href={link}>
          <Button
            mt={10}
            w={"full"}
            colorScheme={"color"}
            bg={color == "grey" ? color : getColor("500")}
            rounded={"xl"}
            px={6}
            _hover={{
              bg: "blue.600",
            }}
          >
            {buttonText}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
