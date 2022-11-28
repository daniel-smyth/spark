import React from 'react';
import Welcome from '../components/Home/Welcome';
import HowItWorks from '../components/Home/HowItWorks';
import MaxCollectionSizeCalculator from '../components/Home/Calculator';
import ComingSoon from '../components/Home/ComingSoon';

function Home() {
  return (
    <>
      <Welcome />
      <MaxCollectionSizeCalculator />
      <HowItWorks />
      <ComingSoon />
    </>
  );
}

export default Home;
