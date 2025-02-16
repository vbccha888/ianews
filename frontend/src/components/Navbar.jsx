import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated, isEditor, logout } from "../utils/auth";

const NavbarComponent = () => {
  const isLoggedIn = isAuthenticated();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Technews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isEditor() && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/Register" className="btn btn-outline-light">Registrar</Nav.Link>
                <Nav.Link as={Link} to="/login" className="btn btn-primary mx-2">Login</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile">Meu Perfil</Nav.Link>
                <Nav.Link onClick={logout} style={{ cursor: "pointer", color: "red" }}>Sair</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;



