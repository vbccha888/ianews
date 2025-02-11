import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Navbar.Text>© 2025 IAnews. Todos os direitos reservados. Hackaton Grupo 1</Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;