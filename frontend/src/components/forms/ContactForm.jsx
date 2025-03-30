import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { submitContactForm } from '../../api/contact';

const ContactForm = () => {
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
    </>
  );
};

export default ContactForm;