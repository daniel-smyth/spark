import {
  Box,
  chakra,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} color={"#1867F0"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Statistics() {
  return (
    <Stack as={Box} textAlign={"center"} spacing={{ base: 1, md: 2 }} py={{}}>
      <Heading
        display={"flex"}
        justifyContent={"center"}
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
        paddingBottom={{ base: 30, md: 16 }}
      >
        What is Spark? <br />
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, lg: 8 }}
        px={8}
      >
        <StatsCard
          title={"Users"}
          stat={"1,000+"}
          icon={<BsPerson size={"3em"} />}
        />
        <StatsCard
          title={"NFTs sold"}
          stat={"100,000+"}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Setup time"}
          stat={"14 days"}
          icon={<GoLocation size={"3em"} />}
        />
      </SimpleGrid>
    </Stack>
  );
}
