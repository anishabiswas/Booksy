// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <img
            src="/logo192.png"
            alt="Booksy Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
        </Navbar.Brand>
        <Navbar.Brand>Booksy</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/book/list">
            Add Listing
          </Nav.Link>
          <Nav.Link as={Link} to="/book/orders">
            Orders
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Button variant="secondary" as={Link} to="/login">
            Login
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
