import React from "react";
import { ConnectWallet } from "@3rdweb/react";
import styles from "./ConnectButton.module.css";

/**
 * * STANDARD THIRDWEB CONNECT BUTTON
 * Also displays current wallet and balance if wallet is connected.
 */
const Connect = () => {
  return <ConnectWallet />;
};

function ConnectButton() {
  return <div className={styles.connectbutton}>{Connect()}</div>;
}

export default ConnectButton;
