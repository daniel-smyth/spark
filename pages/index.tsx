import type { NextPage } from "next";
import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import Hero from "../components/WelcomePage";
import Statistic from "../components/Statistic";
import BusinessSummary from "../components/BusinessSummary";
import Testimonials from "../components/Testimonail";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <Stack as={Box} textAlign={"center"} spacing={{ base: 1, md: 2 }} py={{}}>
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
      <BusinessSummary />
      <Testimonials />
    </div>
  );
};

export default Home;
