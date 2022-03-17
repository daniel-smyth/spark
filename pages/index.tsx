import type { NextPage } from "next";
import Welcome from "../components/homepage/Hero";
import HowItWorks from "../components/homepage/Info";
import Testimonials from "../components/homepage/Testimonail";
import StatisticCard from "../components/homepage/StatCard";
import ComingSoon from "../components/homepage/ComingSoon";
import CollectionCalculator from "../components/homepage/Calculator";

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
