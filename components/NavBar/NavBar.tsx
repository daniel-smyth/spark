import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Image, useImage } from "@chakra-ui/react";
import styles from "./Navbar.module.css";

/**
 * * NAVBAR
 */

function NavBar() {
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

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {width > 1023 ? (
          // PC VIEW
          <Image
            width="8%"
            className={styles.logo}
            src="/sparkblack.png"
          ></Image>
        ) : (
          // MOBILE VIEW
          <Image
            width="15%"
            className={styles.logo}
            src="/sparkblack.png"
          ></Image>
        )}
        <div className={styles.navbarright}>
          <div className={styles.linktext}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/connectwallets">Wallet</Nav.Link>
                <Nav.Link href="/mintprivatenft">Mint</Nav.Link>
                <Nav.Link href="/claimnft">Claim</Nav.Link>
                <NavDropdown title="More" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
