import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
  Offcanvas,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Navbar.module.css";

/**
 * * NAVBAR
 */

function NavBar() {
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
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Col>
          <Image
            ml={8}
            py={4}
            width={{ base: "120px", md: "150px" }}
            src="/sparkblack.png"
          ></Image>
        </Col>
        {/* LINKS (ONLY DISPLAYED ON PC)  */}
        {width > desktopMinResolution ? ( // Render links if user is on PC.
          <Col md="auto">
            <div className={styles.linktext}>
              <Nav.Link href="/connectwallets">Connect</Nav.Link>
              <Nav.Link href="/mintprivatenft">MintTool</Nav.Link>
              <Nav.Link href="/claimnft">Claim NFT</Nav.Link>
            </div>
          </Col>
        ) : null}
        <Col md="auto">
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            {/* OFFCANVAS NAVBAR  */}
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/connectwallets">Connect Wallet</Nav.Link>
                <Nav.Link href="/mintprivatenft">Mint Unique NFT</Nav.Link>
                <Nav.Link href="/claimnft">Claim from Collection</Nav.Link>
                <NavDropdown title="FOR RE-USE" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/* SEARCH BAR  */}
              <div className={styles.searchbarnavbar}></div>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Col>
      </Container>
    </Navbar>
  );
}

export default NavBar;
