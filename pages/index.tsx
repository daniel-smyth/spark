import type { NextPage } from "next";
import Welcome from "../components/homepage/Welcome";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonail";
import StatisticCard from "../components/homepage/StatisticCard";
import ComingSoon from "../components/homepage/ComingSoon";
import CollectionCalculator from "../components/homepage/CollectionCalculator";

const Home: NextPage = () => {
  return (
    <div>
      <Welcome />
      {/* <StatisticCard /> */}
      <CollectionCalculator />
      <HowItWorks />
      {/* <Testimonials /> */}
      <ComingSoon />
    </div>
  );
};

export default Home;
