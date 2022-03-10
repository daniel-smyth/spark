import type { NextPage } from "next";
import Hero from "../components/homepage/Hero";
import BusinessInfo from "../components/homepage/BusinessInfo";
import Testimonials from "../components/homepage/Testimonail";
import StatisticCard from "../components/homepage/StatisticCard";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      {/* <StatisticCard /> */}
      <BusinessInfo />
      {/* <Testimonials /> */}
    </div>
  );
};

export default Home;
