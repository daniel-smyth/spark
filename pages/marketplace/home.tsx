import React, { useEffect } from "react";
import { loadMarketplace } from "../../lib/thirdweb/MarketPlace";

function Home() {
  useEffect(() => {
    const load = async () => {
      loadMarketplace();
    };
    load();
  });

  return <div>Home</div>;
}

export default Home;
