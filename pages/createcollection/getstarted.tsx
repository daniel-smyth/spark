import { Heading } from "@3rdweb/react/node_modules/@chakra-ui/layout";
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { FaObjectGroup } from "react-icons/fa";
import ProductPrice from "../../components/homepage/products/ProductPrice";
import ProductDescription from "../../components/homepage/products/ProductDescription";
import ConnectWalletCard from "../../components/web3/ConnectWalletCard";
import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";

/**
 * Renders a product description component with pricing card an a collection
 * of pricing cards for new products.
 *
 * @returns product page
 */
function Page() {
  const { provider } = useWeb3();
  const router = useRouter();
  const [isTabletOrMobile] = useMediaQuery("(max-width: 1024px)");
  const [isBigScreen] = useMediaQuery("(min-width: 1024px)");

  if (provider) router.push("/createcollection/create");

  return (
    <Container
      maxW="6xl"
      pt={{ base: 16, md: "80px" }}
      pb={{ base: 16, md: "80px" }}
    >
      <Stack spacing={24} px={{ base: 5 }}>
        <Stack spacing={10}>
          <ProductDescription />
          <Box>
            <ConnectWalletCard
              header={"Connect to start"}
              body={"Connect via MetaMask, WalletConnect or Coinbase"}
            />
          </Box>
        </Stack>
        <Stack spacing={5}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            In Development at Spark
          </Heading>
          {isTabletOrMobile && !isBigScreen ? (
            <Stack spacing={6}>
              <ComingSoonBadge icon={FaObjectGroup} feature="NFT data packs" />
              <ComingSoonBadge
                icon={FaObjectGroup}
                feature="NFT Marketplaces"
              />
              <ComingSoonBadge icon={FaObjectGroup} feature="Custom NFTs" />
              <Box display={"flex"} justifyContent={"center"}>
                <Button size="lg" variant={"solid"} width={"100%"}>
                  Learn more
                </Button>
              </Box>
            </Stack>
          ) : null}
          <SimpleGrid
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
      </Stack>
    </Container>
  );
}

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

export default Page;
