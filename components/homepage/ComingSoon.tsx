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
import ProductPrice from "../products/ProductPrice";
import { FiRepeat, FiEdit2, FiImage } from "react-icons/fi";

function ComingSoon() {
  return (
    <>
      <Container maxW="6xl" px={12} spacing={{ base: 8, md: 8 }}>
        <Stack spacing={5} pb={{ base: 16, md: 36 }}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>Coming soon</Heading>
          <Stack spacing={6} display={{ md: "none" }}>
            <ComingSoonBadge icon={FiRepeat} feature="NFT Marketplaces" />
            <ComingSoonBadge icon={FiEdit2} feature="Custom contracts" />
            <ComingSoonBadge icon={FiImage} feature="In house art designers" />
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
              displayRoyalty={true}
              packageName="NFT Data Packs"
              royalty="5"
              feature1="Quick."
              feature2="Fast."
              feature3="Simple."
              feature4="Free."
              buttonText="Learn More"
              link="/login"
            ></ProductPrice>
            <ProductPrice
              color="grey"
              displayRoyalty={true}
              packageName="NFT Marketplaces"
              royalty="5"
              feature1="Quick."
              feature2="Fast."
              feature3="Simple."
              feature4="Free."
              buttonText="Learn More"
              link="/login"
            ></ProductPrice>
            <ProductPrice
              color="grey"
              displayRoyalty={true}
              packageName="Custom NFTs"
              royalty="5"
              feature1="Quick."
              feature2="Fast."
              feature3="Simple."
              feature4="Free."
              buttonText="Learn More"
              link="/login"
            ></ProductPrice>
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
}

export default ComingSoon;

// Coming soon text block interface.
interface ComingSoonBadgeProps {
  icon: any;
  feature: string;
}

// Coming soon text block.
function ComingSoonBadge(props: ComingSoonBadgeProps) {
  const { icon, feature } = props;
  return (
    <Text variant="badge">
      <Flex>
        <Icon as={icon} color={"#1B486D"} w={5} h={5} />
        <Box pl={4}>{feature}</Box>
      </Flex>
    </Text>
  );
}
