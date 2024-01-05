import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Nav, Navbar, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function Header() {
  const searchContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const brandLinkStyle = {
    fontSize: '24px',
    marginLeft: '20px',
    fontWeight: 'bold',
  };

  const headerNavbarStyle = {
    height: '70px',
    backgroundColor: '#f8f9fa',
  };

  const navLinkStyle = {
    paddingRight: '15px',
    color: 'black',
  };

  const searchButtonStyle = {
    border: '1px solid #ccc', // Set default border color
    transition: 'color 0.3s', // Add transition for smooth effect
  };

  const handleSearchIconHover = (event) => {
    event.target.style.color = 'black'; // Change color to black on hover
  };

  const handleSearchIconLeave = (event) => {
    event.target.style.color = ''; // Revert color to default when mouse leaves
  };

  return (
    <Navbar expand="lg" style={headerNavbarStyle}>
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" style={brandLinkStyle}>
          <span style={{ color: 'rgb(100, 116, 139)' }}>Real</span>
          <span style={{ color: 'rgb(51, 65, 85)' }}>Estate</span>
        </Navbar.Brand>
        <div className="flex justify-between flex-grow-1" style={searchContainerStyle}>
          <Form className="d-flex align-items-center">
            <Form.Control type="search" placeholder="Search" className="me-2 rounded-pill" aria-label="Search" />
            <Button
              variant="outline-secondary"
              className="bg-white border rounded-pill"
              style={searchButtonStyle}
              onMouseEnter={handleSearchIconHover}
              onMouseLeave={handleSearchIconLeave}
            >
              <FaSearch />
            </Button>
          </Form>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '120px', marginRight: '30px' }} navbarScroll>
            <Nav.Link as={Link} to="/" style={navLinkStyle}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={navLinkStyle}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/signin" style={navLinkStyle}>
              SignIn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
