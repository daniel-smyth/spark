import type { NextPage } from "next";
import Welcome from "../components/home/Hero";
import HowItWorks from "../components/home/Info";
import CollectionCalculator from "../components/home/Calculator";
import ComingSoon from "../components/home/Soon";

const Home: NextPage = () => {
  return (
    <>
      <Welcome />
      <CollectionCalculator />
      <HowItWorks />
      <ComingSoon />
    </>
  );
};

export default Home;
