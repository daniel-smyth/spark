import type { NextPage } from "next";
import Welcome from "../components/homepage/Hero";
import HowItWorks from "../components/homepage/Info";
import Testimonials from "../components/homepage/Testimonails";
import StatisticCard from "../components/homepage/Stats";
import ComingSoon from "../components/homepage/ComingSoon";
import CollectionCalculator from "../components/utilities/Calculator";

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
