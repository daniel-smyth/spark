import type { NextPage } from "next";
import Welcome from "../components/home/Hero";
import HowItWorks from "../components/home/Info";
import Testimonials from "../components/home/Testimonails";
import StatisticCard from "../components/home/Stats";
import CollectionCalculator from "../components/Calculator";
import ComingSoon from "../components/home/Soon";

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
