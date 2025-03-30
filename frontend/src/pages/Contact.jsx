import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { submitContactForm } from '../api/contact';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    job_title: '',
    job_details: ''
  });
  
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        job_title: '',
        job_details: ''
      });
      setValidated(false);
    } catch (error) {
      console.error('Form submission error:', error);
      setError('There was an error submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Contact Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/contact-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
              <p className="lead">
                Need AI-powered solutions for your business? Get in touch with our team to discuss your specific requirements.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Contact Info Cards */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <Card className="text-center h-100 shadow-sm border-0 p-4">
                <Card.Body>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                    <FaPhoneAlt size={30} />
                  </div>
                  <Card.Title>Phone</Card.Title>
                  <Card.Text className="text-muted">
                    +44 123 456 7890
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4 mb-md-0">
              <Card className="text-center h-100 shadow-sm border-0 p-4">
                <Card.Body>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                    <FaEnvelope size={30} />
                  </div>
                  <Card.Title>Email</Card.Title>
                  <Card.Text className="text-muted">
                    contact@ai-solution.com
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="text-center h-100 shadow-sm border-0 p-4">
                <Card.Body>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                    <FaMapMarkerAlt size={30} />
                  </div>
                  <Card.Title>Office</Card.Title>
                  <Card.Text className="text-muted">
                    AI-Solution Headquarters, Sunderland, UK
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Contact Form */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-5">
                  <h2 className="text-center mb-4">Get In Touch</h2>
                  
                  {success && (
                    <Alert variant="success" className="mb-4">
                      Thank you for your inquiry! Our team will get back to you shortly.
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert variant="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}
                  
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Your Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter your name.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Phone Number *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter your phone number.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Company Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter your company name.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Country *</Form.Label>
                          <Form.Control
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter your country.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Job Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Job Details *</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="job_details"
                        value={formData.job_details}
                        onChange={handleChange}
                        rows={5}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter job details.
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <div className="text-center">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                        className="px-5"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Submitting...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Map Section */}
      <section className="py-0">
        <div className="map-container" style={{ height: '400px' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71485.77147516654!2d-1.4565884360351317!3d54.90518316583199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e66b2e9fa8ae3%3A0xb20bb2fe39aa34e2!2sSunderland%2C%20UK!5e0!3m2!1sen!2sus!4v1648068013217!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default ContactPage;