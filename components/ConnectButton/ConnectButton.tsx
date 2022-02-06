import React from "react";
import { ConnectWallet } from "@3rdweb/react";

/**
 * * SIMPLE CONNECT WALLET BUTTON
 * Simple Thirdweb connect wallet button. If wallet is
 * connected it will displauy the users wallet details.
 * Details include address and balance.
 */
const Connect = () => {
  return <ConnectWallet />;
};

function ConnectButton() {
  return <div>{Connect()}</div>;
}

export default ConnectButton;
