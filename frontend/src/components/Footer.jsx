import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="relative">
      <Container>
        <Navbar.Text>© 2025 Technews. Todos os direitos reservados. FIAP HACKATON Grupo 1</Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;