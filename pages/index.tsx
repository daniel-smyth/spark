import type { NextPage } from "next";
import Welcome from "../components/homepage/Welcome";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonail";
import StatisticCard from "../components/homepage/StatisticCard";

const Home: NextPage = () => {
  return (
    <div>
      <Welcome />
      {/* <StatisticCard /> */}
      <HowItWorks />
      {/* <Testimonials /> */}
    </div>
  );
};

export default Home;
