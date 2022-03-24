import {
  Stack,
  Box,
  Heading,
  Button,
  SimpleGrid,
  Text,
  Flex,
  Icon,
  Container,
} from "@chakra-ui/react";
import React from "react";
import ProductPrice from "../cards/Price";
import { AiTwotoneShop } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import { VscOrganization } from "react-icons/vsc";

function ComingSoon() {
  return (
    <Container maxW="6xl" px={12} spacing={{ base: 8, md: 8 }}>
      <Stack spacing={5} pb={{ base: 16, md: 36 }}>
        <Heading fontSize={{ base: "2xl", md: "3xl" }}>Coming soon</Heading>
        <Stack spacing={6} display={{ md: "none" }}>
          <Box
            textTransform="uppercase"
            color="blue.400"
            fontSize="sm"
            bg="blue.50"
            p="2"
            px="3"
            rounded="md"
            display={"flex"}
          >
            <Icon as={AiTwotoneShop} color={"#1B486D"} w={5} h={5} />
            <Text fontWeight={600} pl={2}>
              NFT Marketplace
            </Text>
          </Box>
          <Box
            textTransform="uppercase"
            color="blue.400"
            fontSize="sm"
            bg="blue.50"
            p="2"
            px="3"
            rounded="md"
            display={"flex"}
          >
            <Icon as={BsCoin} color={"#1B486D"} w={5} h={5} />
            <Text fontWeight={600} pl={2}>
              ERC20 Token
            </Text>
          </Box>
          <Box
            textTransform="uppercase"
            color="blue.400"
            fontSize="sm"
            bg="blue.50"
            p="2"
            px="3"
            rounded="md"
            display={"flex"}
          >
            <Icon as={VscOrganization} color={"#1B486D"} w={5} h={5} />
            <Text fontWeight={600} pl={2}>
              DAo
            </Text>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button size="md" variant={"solid"} width={"100%"}>
              Learn more
            </Button>
          </Box>
        </Stack>
        <SimpleGrid
          display={{ base: "none", md: "flex" }}
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 12, md: 10 }}
        >
          <ProductPrice
            color="grey"
            displayRoyalty={false}
            packageName="NFT Marketplace"
            royalty="5"
            feature1="Sell your way"
            feature2="Host on your website"
            feature3="Host on Spark3"
            feature4="Quick setup"
            buttonText="Create Marketplace"
            isDisabled={true}
          ></ProductPrice>
          <ProductPrice
            color="grey"
            displayRoyalty={false}
            packageName="Token"
            royalty="5"
            feature1="ERC20 token"
            feature2="Create in minutes"
            feature3="Sell on any exchange"
            feature4="Minting costs only"
            buttonText="Create token"
            isDisabled={true}
          ></ProductPrice>
          <ProductPrice
            color="grey"
            displayRoyalty={false}
            packageName="DAO"
            royalty="5"
            feature1="Build treasury"
            feature2="Build governance"
            feature3="Voting"
            feature4="Minting costs only"
            buttonText="Create DAO"
            isDisabled={true}
          ></ProductPrice>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default ComingSoon;
