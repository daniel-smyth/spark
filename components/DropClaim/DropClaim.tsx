import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { Button } from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import styles from "./DropClaim.module.css";

/**
 * * MINT NFT FROM COLLECTION
 */

function DropClaim() {
  const { provider } = useWeb3();

  // Use memorization. Function runs once on compile, not each time page
  // is rendered.
  const sdk = useMemo(() => {
    if (provider) {
      return new ThirdwebSDK(provider.getSigner());
    }
    return undefined;
  }, [provider]);

  // Get drop module from ThirdWeb.
  const dropModule = useMemo(() => {
    if (sdk) {
      return sdk.getDropModule("0x1Ba6678d4b343445e6b9E5BC277A26A6Dd403d07");
    }
    return undefined;
  }, [sdk]);

  // Claim NFT on click.
  const onClick = useCallback(() => {
    if (dropModule) dropModule.claim(1);
  }, [dropModule]);

  return (
    <div className={styles.aligncenter}>
      {/* MINT NFT BUTTON  */}
      <Button onClick={onClick}>CLAIM NFT</Button>
    </div>
  );
}

export default DropClaim;
