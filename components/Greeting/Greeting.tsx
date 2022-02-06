import { Image, Text } from "@chakra-ui/react";
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
          <div className={styles.centerimage}>
            <Image ml="2%" width="100%" src="sparklogobackground.png"></Image>
          </div>
          <div className={styles.centertext}>
            <Text color="white" fontSize={25}>
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
