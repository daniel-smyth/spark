import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Spark</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* HOME */}
            <Nav.Link href="/">Home</Nav.Link>
            {/* CONNECT WALLET  */}
            <Nav.Link href="/connectwallets">Connect Wallets</Nav.Link>
            {/* MINT PRIVATE  */}
            <Nav.Link href="/mintprivatenft">Mint Private NFT</Nav.Link>
            {/* CLAIM NFT  */}
            <Nav.Link href="/claimnft">Claim NFT</Nav.Link>
            {/* DROP DOWN  */}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
