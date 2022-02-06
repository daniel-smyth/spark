import type { NextPage } from "next";
import { Text } from "@chakra-ui/react";
import ConnectButton from "../components/ConnectButton/ConnectButton";
import styles from "../styles/Home.module.css";

/**
 * * HOME PAGE
 */
const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <Text align={"center"} fontSize={30} fontWeight={"bold"}>
          Welcome Danny
        </Text>
        <Text mt="5%" align={"center"} fontWeight={"light"} fontSize={20}>
          Connect to begin
        </Text>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Home;
