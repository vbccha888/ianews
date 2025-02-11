import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const isEditor = localStorage.getItem("isEditor") === "true";

  return (
    <Navbar class="navbar navbar-expand-lg navbar-dark">
        <Navbar.Brand as={Link} to="/">📰 IANews</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav"/>
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isEditor && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;