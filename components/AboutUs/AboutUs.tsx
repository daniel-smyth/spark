import { Image } from "@chakra-ui/react";
import React from "react";
import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.centerpiece}>
        <div className={styles.title}>
          <h1>What is Spark?</h1>
        </div>

        <div className={styles.logocontainer}>
          <div className={styles.logo}>
            <Image src="/sparklogobackground.png"></Image>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.imagepiece}>
            <Image src="/https.png" ml="20%" padding="10%"></Image>
          </div>
          <div className={styles.textpiece}>
            Sell NFTs on your website or can just use Spark’s.
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.imagepiece}>
            <Image src="/dollar.png" ml="20%" padding="40%"></Image>
          </div>
          <div className={styles.textpiece}>
            Low cost, fast and with support.
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.imagepiece}>
            <Image src="/sale.png" ml="20%" padding="10%"></Image>
          </div>
          <div className={styles.textpiece}>
            Art, mint, promotion, and marketplace.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
