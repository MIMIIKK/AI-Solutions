import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BootstrapNavbar 
      expand="lg" 
      fixed="top"
      className={`py-3 transition-all ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <strong className="text-primary">AI-Solution</strong>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link 
              as={NavLink} 
              to="/"
              className={({ isActive }) => isActive ? 'active' : ''}
              end
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/about"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              About
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/services"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Services
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/projects"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Projects
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/events"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Events
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/blog"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Blog
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link as={Link} to="/contact" className="me-3">
              <Button variant="outline-primary" className="rounded-pill px-4">
                Contact Us
              </Button>
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;