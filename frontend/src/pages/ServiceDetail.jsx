import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, ListGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../api/services';
import RatingStars from '../components/testimonials/RatingStars';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import TestimonialForm from '../components/testimonials/TestimonialForm';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialSuccess, setTestimonialSuccess] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const serviceData = await getServiceBySlug(slug);
        setService(serviceData);
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Failed to load service details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug]);

  const handleTestimonialSubmit = () => {
    setShowTestimonialForm(false);
    setTestimonialSuccess(true);
    
    // Hide the success message after 5 seconds
    setTimeout(() => {
      setTestimonialSuccess(false);
    }, 5000);
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading service details...</p>
        </div>
      </Container>
    );
  }

  if (error || !service) {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="danger">
          {error || 'Service not found'}
        </Alert>
        <div className="text-center mt-4">
          <Button as={Link} to="/services" variant="primary">
            Back to Services
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Service Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">{service.title}</h1>
              <div className="d-flex align-items-center mb-4">
                <RatingStars rating={service.average_rating} size={24} />
                <span className="ms-2 text-white">({service.average_rating.toFixed(1)})</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Service Details */}
      <section className="py-5">
        <Container>
          <Row>
            {/* Main Content */}
            <Col lg={8}>
              <div className="mb-5">
                <h2 className="mb-4">Overview</h2>
                <p className="lead">{service.description}</p>
              </div>
              
              <div className="mb-5">
                <h2 className="mb-4">Key Features</h2>
                <ListGroup variant="flush">
                  {service.features_list.map((feature, index) => (
                    <ListGroup.Item key={index} className="bg-transparent ps-0 border-0 py-2">
                      <div className="d-flex">
                        <div className="me-3 text-primary">✓</div>
                        <div>{feature}</div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>
            
            {/* Sidebar */}
            <Col lg={4}>
              <div className="bg-light p-4 rounded mb-4">
                <h4 className="mb-4">Ready to Get Started?</h4>
                <p>Interested in this service? Contact us to discuss your specific requirements.</p>
                <Button as={Link} to="/contact" variant="primary" className="w-100">
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="mb-4">Customer Feedback</h2>
          
          {testimonialSuccess && (
            <Alert variant="success" className="mb-4">
              Thank you for your feedback! Your testimonial has been submitted for review.
            </Alert>
          )}
          
          {service.testimonials.length > 0 ? (
            <Row className="g-4 mb-5">
              {service.testimonials.map(testimonial => (
                <Col key={testimonial.id} lg={4} md={6}>
                  <TestimonialCard testimonial={testimonial} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="mb-5">No testimonials yet. Be the first to leave feedback!</p>
          )}
          
          {showTestimonialForm ? (
            <TestimonialForm 
              contentType="service" 
              objectId={service.id}
              onSubmitSuccess={handleTestimonialSubmit}
            />
          ) : (
            <div className="text-center">
              <Button 
                variant="outline-primary" 
                onClick={() => setShowTestimonialForm(true)}
              >
                Leave Your Feedback
              </Button>
            </div>
          )}
        </Container>
      </section>
      
      {/* Related Services would go here in a more complete implementation */}
    </>
  );
};

export default ServiceDetailPage;