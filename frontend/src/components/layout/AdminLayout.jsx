import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FaHome, FaEnvelope, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="admin-dashboard d-flex flex-column min-vh-100">
      <header className="bg-dark text-white p-3">
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0">AI-Solution Admin</h4>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </div>
        </Container>
      </header>
      
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={2} className="bg-light p-0">
            <Nav className="flex-column py-3">
              <Nav.Link as={Link} to="/" className="py-2">
                <FaHome className="me-2" />
                Back to Site
              </Nav.Link>
              <Nav.Link as={Link} to="/admin" className="py-2">
                <FaTachometerAlt className="me-2" />
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/inquiries" className="py-2">
                <FaEnvelope className="me-2" />
                Inquiries
              </Nav.Link>
            </Nav>
          </Col>
          
          <Col md={10} className="py-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLayout;