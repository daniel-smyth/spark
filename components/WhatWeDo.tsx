import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaObjectGroup, FaShippingFast } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { ReactElement } from "react";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
  return (
    <Container
      maxW="6xl"
      spacing={{ base: 8, md: 8 }}
      pt={{ base: 16, md: "80px" }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} px={{ base: 5 }}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize="sm"
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            What we do
          </Text>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Quick and Simple
          </Heading>
          <Text color={"gray.500"} fontSize="lg" py={{ base: 5, md: 2 }}>
            After we create your NFT collection you choose between Spark
            installing our custom NFT marketplace on your website or sell
            directly on the Spark website for free.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={FaObjectGroup} color={"#1B486D"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"1. Spark creates your NFTs"}
            />
            <Feature
              icon={<Icon as={FaShippingFast} color={"#1B486D"} w={5} h={5} />}
              iconBg={"#3199FF"}
              text={"2. Spark installs your new NFT marketplace"}
            />
            <Feature
              icon={<Icon as={BsShop} color={"#1B486D"} w={5} h={5} pb={0.5} />}
              iconBg={"#3199FF"}
              text={"3. You enjoy your new ThirdWeb website"}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"/boredape.jpg"}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
