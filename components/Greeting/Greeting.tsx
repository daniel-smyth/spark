import { Text } from "@chakra-ui/react";
import React from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./Greeting.module.css";

/**
 * * GREETING WITH CONNECT BUTTON
 */
export default function Greeting() {
  return (
    <div className={styles.background}>
      <div className={styles.gridcontainer}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className={styles.centerpiece}>
          <div>
            <Text color="white" fontSize={40} fontWeight={"bold"}>
              Welcome Danny
            </Text>
          </div>
          <div>
            <Text color="white" fontSize={30} fontWeight={"light"}>
              Connect to begin
            </Text>
          </div>
          <div>
            {/* CONNECT BUTTON  */}
            <ConnectButton />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
