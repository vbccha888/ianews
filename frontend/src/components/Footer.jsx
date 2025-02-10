import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Navbar.Text>© 2023 IAnews. Todos os direitos reservados.</Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;