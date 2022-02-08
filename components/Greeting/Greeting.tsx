import { Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./Greeting.module.css";

/**
 * * GREETING WITH CONNECT BUTTON
 */
export default function Greeting() {
  // Mobile: width < 1024.
  // Desktop: width > 1023.
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    // Component mounts width is set.
    updateDimensions();

    // Listen for resize whiled mounted and set width.
    window.addEventListener("resize", updateDimensions);

    // Remove event listener on unmount.
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Set width function.
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return width < 1024 ? (
    <div className={styles.background}>
      <div className={styles.gridcontainer}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className={styles.centerpiece}>
          <div className={styles.centerimage}>
            <Image width="85%" src="sparkwhite.png"></Image>
          </div>
          <div className={styles.centertext}>
            <Text color="white" fontSize={25}>
              Future of the internet
            </Text>
          </div>
          <div style={{ paddingTop: "1vh" }}>
            <ConnectButton />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
