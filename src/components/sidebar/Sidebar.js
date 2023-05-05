import React from "react";
import { Breadcrumb, Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/setting" className="text-warning">Setting</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/setting/changeprofile" className="text-warning">Change Profile</Nav.Link>
            <Nav.Link as={Link} to="/setting/changepassword" className="text-warning">Change Password</Nav.Link>
            <Nav.Link as={Link} to="/setting/uploadavatar" className="text-warning">Upload Avatar</Nav.Link>
            <NavDropdown title="Help" id="navdropdowntitle" variant="warning">
              <NavDropdown.Item as={Link} to="/contactus">Contact Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/aboutus">
                About Us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default Footer;