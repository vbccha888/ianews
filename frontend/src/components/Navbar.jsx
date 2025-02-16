import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated, isEditor, logout } from "../services/auth";

const NavbarComponent = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated());
  const [editorStatus, setEditorStatus] = useState(isEditor());

  useEffect(() => {
    const updateAuthStatus = () => {
      setUserLoggedIn(isAuthenticated());
      setEditorStatus(isEditor());
    };

    window.addEventListener("authChange", updateAuthStatus);

    return () => {
      window.removeEventListener("authChange", updateAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Technews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {editorStatus && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
          </Nav>
          <Nav>
            {userLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile">Meu Perfil</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>Sair</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Criar Conta</Nav.Link> {/* ✅ Novo link */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;






