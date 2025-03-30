import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getServices } from '../api/services';
import RatingStars from '../components/testimonials/RatingStars';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices();
        setServices(response.results || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Services Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/services-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Our Services</h1>
              <p className="lead">
                Explore our range of AI-powered software solutions designed to transform your business.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Services List */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col md={6} className="mx-auto">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading services...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead">No services found matching "{search}"</p>
              <Button variant="outline-primary" onClick={() => setSearch('')}>
                Clear Search
              </Button>
            </div>
          ) : (
            <Row>
              {filteredServices.map(service => (
                <Col key={service.id} lg={4} md={6} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm">
                    <div className="overflow-hidden" style={{ height: '200px' }}>
                      <Card.Img 
                        variant="top" 
                        src={service.image} 
                        alt={service.title} 
                        className="img-fluid h-100 w-100 object-fit-cover" 
                      />
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="mb-0">{service.title}</Card.Title>
                        <div className="d-flex align-items-center">
                          <RatingStars rating={service.average_rating} size={14} />
                          <span className="ms-1 small">({service.average_rating.toFixed(1)})</span>
                        </div>
                      </div>
                      <Card.Text>
                        {service.description.substring(0, 120)}...
                      </Card.Text>
                      <Button as={Link} to={`/services/${service.slug}`} variant="outline-primary">
                        Learn More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Looking for a Custom Solution?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Our team can develop a tailored AI solution to meet your specific business needs.
          </p>
          <Button as={Link} to="/contact" variant="light" size="lg">
            Contact Us
          </Button>
        </Container>
      </section>
    </>
  );
};

export default ServicesPage;