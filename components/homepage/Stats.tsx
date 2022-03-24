import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { Stack, Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Statistic from "../cards/Stat";

function StatisticCard() {
  return (
    <Stack as={Box} textAlign={"center"} spacing={{ base: 1, md: 2 }}>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, lg: 8 }}
        px={{ base: 8, md: 32 }}
      >
        <Statistic
          title={"Users"}
          stat={"1,000+"}
          icon={<BsPerson size={"3em"} />}
        />
        <Statistic
          title={"NFTs sold"}
          stat={"100,000+"}
          icon={<FiServer size={"3em"} />}
        />
        <Statistic
          title={"Setup time"}
          stat={"14 days"}
          icon={<GoLocation size={"3em"} />}
        />
      </SimpleGrid>
    </Stack>
  );
}

export default StatisticCard;
