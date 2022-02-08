import { Container, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./Greeting.module.css";

/**
 * * GREETING WITH CONNECT BUTTON
 */
export default function Greeting() {
  const mobileMaxResolution = 1024;
  const desktopMinResolution = 1023;
  const [width, setWindowWidth] = useState(0);

  // Add hooks.
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

  return (
    <div className={styles.background}>
      {width < mobileMaxResolution ? (
        // MOBILE
        <Container fluid>
          <Col></Col>
          <Col md="auto">
            <div className={styles.homepagediv}>
              <Image width="20%" src="icononly.png"></Image>
              <Text color="white" fontSize={40} fontWeight={700}>
                Create and Sell
              </Text>
              <Text color="white" fontSize={25} fontWeight={300}>
                Fast. Cheap. Today.
              </Text>
              <div style={{ marginTop: "10px" }}>
                <ConnectButton />
              </div>
            </div>
          </Col>
          <Col></Col>
        </Container>
      ) : (
        // DESKTOP
        <Container fluid>
          <Col></Col>
          <Col md="auto">
            <div className={styles.homepagediv}>
              <Image width="20%" src="icononly.png"></Image>
              <Text mt="10px" color="black" fontSize={40} fontWeight={700}>
                Create and Sell
              </Text>
              <Text color="black" fontSize={25} fontWeight={300}>
                Fast. Cheap. Today.
              </Text>
              <div style={{ marginTop: "10px" }}>
                <ConnectButton />
              </div>
            </div>
          </Col>
        </Container>
      )}
    </div>
  );
}
