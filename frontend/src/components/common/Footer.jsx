import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5">
      <Container>
        <Row className="pb-4">
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-4">About AI-Solution</h5>
            <p>
              AI-Solution leverages AI to assist various industries with software solutions to rapidly and proactively address issues that can impact the digital employee experience.
            </p>
            <div className="social-icons d-flex mt-4">
              <a href="#" className="me-3 text-light">
                <FaFacebookF />
              </a>
              <a href="#" className="me-3 text-light">
                <FaTwitter />
              </a>
              <a href="#" className="me-3 text-light">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-light">
                <FaInstagram />
              </a>
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-light text-decoration-none">Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/projects" className="text-light text-decoration-none">Projects</Link>
              </li>
              <li className="mb-2">
                <Link to="/events" className="text-light text-decoration-none">Events</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-light text-decoration-none">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">Contact</Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1" />
                <span>AI-Solution Headquarters, Sunderland, UK</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhoneAlt className="me-2" />
                <span>+44 123 456 7890</span>
              </li>
              <li className="d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <span>contact@ai-solution.com</span>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-white mb-4">Newsletter</h5>
            <p>Subscribe to our newsletter to receive updates on our services and events.</p>
            <Form className="mt-4">
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Your Email" className="bg-transparent border-light text-light" />
              </Form.Group>
              <Button variant="primary" className="w-100">Subscribe</Button>
            </Form>
          </Col>
        </Row>
        
        <hr className="border-secondary" />
        
        <Row className="py-3">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">&copy; {new Date().getFullYear()} AI-Solution. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              <Link to="/privacy-policy" className="text-light me-3 text-decoration-none">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-light text-decoration-none">Terms of Service</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;