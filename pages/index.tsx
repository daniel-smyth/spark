import type { NextPage } from "next";
import Statistics from "../components/Statistics";
import WhatWeDo from "../components/WhatWeDo";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonail";
import { useWeb3 } from "@3rdweb/hooks";

/**
 * * INDEX PAGE
 * Currrently only renders a connect wallet button.
 */
const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <Statistics />
      <WhatWeDo />
      <Testimonials />
    </div>
  );
};

export default Home;
