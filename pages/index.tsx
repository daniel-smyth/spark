import type { NextPage } from "next";
import AboutUs from "../components/AboutUs/AboutUs";
import Greeting from "../components/Greeting/Greeting";

/**
 * * INDEX PAGE
 * Currrently only renders a connect wallet button.
 */
const Home: NextPage = () => {
  return (
    <div>
      <div>{/* <Greeting />; */}</div>
      <div>
        <AboutUs />
      </div>
    </div>
  );
};

export default Home;
