import React from "react";
import { Image } from "@chakra-ui/react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Daniel Smyth
        </a>
      </footer>
    </div>
  );
}

export default Footer;
