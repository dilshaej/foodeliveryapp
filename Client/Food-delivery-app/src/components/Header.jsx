import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header({ setShowLogin, user, clearCartOnLogout }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('home');

  const handleLogout = () => {
    // Clear the existing user session
    sessionStorage.removeItem('existingUser');
    sessionStorage.removeItem('token');
    // Clear cart items
    clearCartOnLogout();
    // Redirect to home or any other page
    navigate('/');
  };

  return (
    <div>
      <Navbar expand="lg" className=" btn btn-danger ">
        <Container>
          <Navbar.Brand href="/" className="me-auto">
            <span style={{ fontFamily: "'Lobster', sans-seri", fontSize: '30px' }}>
              Fast Food <i className="fa-solid fa-burger"></i>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-3">
              <Nav.Link onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
                Home
              </Nav.Link>
              <Nav.Link href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>
                Menu
              </Nav.Link>
              <Nav.Link href="#contact" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>
                Contact Us
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto text-black">
              <Link to={'/myorders'} style={{textDecoration:'none'}} className='text-black p-3'> My orders</Link>
              <button className="btn">
                {' '}
                <Link style={{textDecoration:'none'}} to={'/cart'} className="text-black">
                  {' '}
                  Cart<i className="fa-solid fa-bag-shopping" style={{ marginRight: '20px' }}></i>
                </Link>
              </button>
              {user ? (
                <button className="btn" onClick={handleLogout}>
                  <Link style={{textDecoration:'none'}}  to={'/'} className="text-black">Logout
                    <i className="fa-solid fa-sign-out" style={{ marginRight: '20px' }}></i>
                  </Link>
                </button>
              ) : (
                <button className="btn" onClick={() => setShowLogin(true)}>
                  <Link style={{textDecoration:'none'}} to={'/login'} className="text-black">Login
                    <i className="fa-solid fa-user" style={{ marginRight: '20px' }}></i>
                  </Link>
                </button>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
