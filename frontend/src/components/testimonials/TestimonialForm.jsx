import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createTestimonial } from '../../api/testimonials';

const TestimonialForm = ({ contentType, objectId, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    company: '',
    comment: '',
    rating: 5,
    content_type_name: contentType,
    object_id: objectId
  });
  
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
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
      await createTestimonial(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        position: '',
        company: '',
        comment: '',
        rating: 5,
        content_type_name: contentType,
        object_id: objectId
      });
      
      setValidated(false);
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setError('There was an error submitting your testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-light p-4 rounded">
      <h4 className="mb-4">Leave Your Feedback</h4>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name *</Form.Label>
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
        
        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
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
        
        <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Rating *</Form.Label>
          <Form.Select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-4">
          <Form.Label>Your Feedback *</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={5}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your feedback.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default TestimonialForm;