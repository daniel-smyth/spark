import type { NextPage } from "next";
import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import Hero from "../components/homepage/Hero";
import Statistic from "../components/homepage/Statistic";
import BusinessInfo from "../components/homepage/BusinessInfo";
import Testimonials from "../components/homepage/Testimonail";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
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
      <BusinessInfo />
      <Testimonials />
    </div>
  );
};

export default Home;
