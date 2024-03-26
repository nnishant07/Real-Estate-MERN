import React,{useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Container, Form, Nav, Navbar, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

function Header() {
  const isSmallScreen = useMediaQuery({ maxWidth: 991 });
  const searchContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const brandLinkStyle = {
    fontSize: '24px',
    marginLeft: '15px',
    fontWeight: 'bold',
  };

  const headerNavbarStyle = {
    height: '70px',
    backgroundColor: 'rgb(226 ,232 ,240)',
  };

  const navLinkStyle = {
    paddingRight: '15px',
    color: 'black',
  };

  const searchButtonStyle = {
    border: '1px solid #ccc', // Set default border color
    transition: 'color 0.3s', // Add transition for smooth effect
  };

  const profileImageStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginLeft: '10px',
    display: isSmallScreen ? 'none' : 'inline-block',
  };

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm,setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(()=>{
    const urlParams =  new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[window.location.search]);
  return (
    <Navbar expand="lg" style={headerNavbarStyle}>
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" style={brandLinkStyle}>
          <span style={{ color: 'rgb(100, 116, 139)' }}>Real</span>
          <span style={{ color: 'rgb(51, 65, 85)' }}>Estate</span>
        </Navbar.Brand>
        <div className="flex justify-between flex-grow-1" style={searchContainerStyle}>
          <Form className="d-flex align-items-center" onSubmit={handleSubmit}>
            <Form.Control type="search" placeholder="Search" className="me-2 rounded-pill" aria-label="Search" value={searchTerm} 
              onChange={(e)=> setSearchTerm(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              className="bg-white border rounded-pill"
              style={searchButtonStyle}
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
            {isSmallScreen ? (
              <Nav.Link as={Link} to="/profile" style={navLinkStyle}>
                Profile
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/profile" style={navLinkStyle}>
                {currentUser ? (
                  <img src={currentUser.avatar} alt="User Image" style={profileImageStyle} />
                ) : (
                  'SignIn'
                )}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
